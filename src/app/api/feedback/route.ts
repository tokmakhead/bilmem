import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple in-memory rate limiting (Note: resets on server restart/lambda cold start)
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 5;
const requestLog = new Map<string, number[]>();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { subject, message, email, type, url, userAgent, honeypot } = data;

        // 1. Spam Check (Honeypot)
        if (honeypot) {
            // Return success silently for bots
            return NextResponse.json({ success: true, message: 'Received' });
        }

        // 2. Validation
        if (!message || typeof message !== 'string' || message.length < 3) {
            return NextResponse.json({ error: 'Mesaj çok kısa.' }, { status: 400 });
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Geçersiz e-posta adresi.' }, { status: 400 });
        }

        // 3. Rate Limiting (IP based - approximate)
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const timestamps = requestLog.get(ip) || [];

        // Filter out old timestamps
        const recentRequests = timestamps.filter(time => now - time < RATE_LIMIT_WINDOW);

        if (recentRequests.length >= MAX_REQUESTS_PER_IP) {
            return NextResponse.json(
                { error: 'Çok fazla istek gönderdiniz. Lütfen bir süre bekleyin.' },
                { status: 429 }
            );
        }

        // Update log
        recentRequests.push(now);
        requestLog.set(ip, recentRequests);

        // 4. Send Email via Nodemailer
        const host = process.env.FEEDBACK_SMTP_HOST;
        const port = Number(process.env.FEEDBACK_SMTP_PORT) || 465;
        const user = process.env.FEEDBACK_EMAIL_USER;
        const pass = process.env.FEEDBACK_EMAIL_PASS;

        if (!host || !user || !pass) {
            console.error('SMTP configuration missing');
            return NextResponse.json({ error: 'Sunucu yapılandırma hatası.' }, { status: 500 });
        }

        // SMTP Transporter - Ultimate Compatibility Mode
        const transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: port === 465, // true for 465, false for other ports
            name: 'bilmem.net', // Force valid hostname for HELO/EHLO checks
            auth: {
                user: user,
                pass: pass,
            },
            tls: {
                // Do not fail on invalid certs
                rejectUnauthorized: false,
                // Force TLS v1.2 if possible, legacy support
                minVersion: "TLSv1",
            },
            // Debugging
            debug: true, // show debug output
            logger: true, // log information in console
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 10000, // 10 seconds
            socketTimeout: 10000, // 10 seconds
        });

        // Email Content - Simple & Clean
        const mailOptions = {
            from: user, // Must match authenticated user exactly
            to: process.env.FEEDBACK_TO_EMAIL || user,
            replyTo: email, // User's email for hitting "Reply"
            subject: `[Feedback: ${type}] ${subject || 'No Subject'} - AI Hediye`,
            text: `
Yeni Geri Bildirim:

Tip: ${type}
Konu: ${subject || '-'}
Mesaj: ${message}

------------------------
Gönderen: ${email || 'Anonim'}
Sayfa: ${url}
IP: ${ip}
Tarih: ${new Date().toLocaleString('tr-TR')}
User Agent: ${userAgent}
            `,
            html: `
<h3>Yeni Geri Bildirim</h3>
<p><strong>Tip:</strong> ${type}</p>
<p><strong>Konu:</strong> ${subject || '-'}</p>
<p><strong>Mesaj:</strong></p>
<blockquote style="border-left: 4px solid #eee; padding-left: 10px; color: #555;">
  ${message.replace(/\n/g, '<br>')}
</blockquote>
<hr>
<p><small><strong>Gönderen:</strong> ${email || 'Anonim'}</small></p>
<p><small><strong>Sayfa:</strong> ${url}</small></p>
<p><small><strong>IP:</strong> ${ip}</small></p>
<p><small><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</small></p>
            `
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent' });

    } catch (error) {
        console.error('Feedback API Error:', error);
        return NextResponse.json(
            { error: 'İşlem sırasında bir hata oluştu.' },
            { status: 500 }
        );
    }
}
