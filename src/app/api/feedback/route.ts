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
        // NOTE: In production, configure FEEDBACK_* environment variables

        // Check if configuration exists
        if (!process.env.FEEDBACK_SMTP_HOST || !process.env.FEEDBACK_EMAIL_USER) {
            // Dev mode: Log only if no config
            if (process.env.NODE_ENV === 'development') {
                console.log('=== FEEDBACK RECEIVED (No SMTP Config) ===');
                console.log('Type:', type);
                console.log('Subject:', subject);
                console.log('Message:', message);
                console.log('From:', email);
                console.log('URL:', url);
                console.log('UA:', userAgent);
                console.log('==========================================');
                return NextResponse.json({ success: true, mode: 'dev_log' });
            } else {
                // Prod: Error if no mailer configured
                console.error('SMTP configuration missing for feedback form');
                return NextResponse.json({ error: 'Sunucu yapılandırma hatası.' }, { status: 500 });
            }
        }

        // SMTP Transporter
        const transporter = nodemailer.createTransport({
            host: process.env.FEEDBACK_SMTP_HOST,
            port: Number(process.env.FEEDBACK_SMTP_PORT) || 587,
            secure: process.env.FEEDBACK_SMTP_SECURE === 'true',
            auth: {
                user: process.env.FEEDBACK_EMAIL_USER,
                pass: process.env.FEEDBACK_EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Fix for some shared hosting certificate issues
                ciphers: 'SSLv3'
            }
        });

        // Email Content
        const mailOptions = {
            from: `"Feedback Form" <${process.env.FEEDBACK_EMAIL_USER}>`,
            to: process.env.FEEDBACK_TO_EMAIL || process.env.FEEDBACK_EMAIL_USER,
            replyTo: email,
            subject: `[Feedback: ${type}] ${subject || 'No Subject'} - AI Hediye`,
            text: `
        Yeni Geri Bildirim:
        
        Tip: ${type}
        Konu: ${subject || '-'}
        Mesaj: ${message}
        
        ------------------------
        Gönderen Email: ${email || 'Anonim'}
        Sayfa: ${url}
        Zaman: ${new Date().toLocaleString('tr-TR')}
        IP: ${ip}
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
        <p><small><strong>Email:</strong> ${email || 'Anonim'}</small></p>
        <p><small><strong>Sayfa:</strong> ${url}</small></p>
        <p><small><strong>Zaman:</strong> ${new Date().toLocaleString('tr-TR')}</small></p>
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
