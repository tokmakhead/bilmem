'use client';

import { useEffect, useRef } from 'react';

/**
 * AntigravityCanvas
 * A high-performance 2D Canvas effect inspired by antigravity.google.
 * Features a flow-field of particles (dashes) that react to mouse MOVEMENT (Inertia/Drag) 
 * rather than position (Attraction), preventing clumping.
 */
export default function AntigravityCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Track position AND velocity of mouse for "Drag" effect
    const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false });
    const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
    const particlesRef = useRef<Particle[]>([]);

    class Particle {
        x: number = 0;
        y: number = 0;
        vx: number = 0;
        vy: number = 0;
        size: number = 0;
        color: string = '';
        originalX: number = 0;
        originalY: number = 0;

        constructor(width: number, height: number) {
            this.init(width, height);
        }

        init(width: number, height: number) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.originalX = this.x;
            this.originalY = this.y;
            // Base wandering velocity
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
            this.size = 1 + Math.random() * 3;

            const colors = ['#4285F4', '#F47F7F', '#CBD5E1', '#FBBC05'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update(width: number, height: number, mouse: { x: number, y: number, vx: number, vy: number, active: boolean }) {
            // 1. Base State: Constant wandering (Independent movement)
            this.x += this.vx;
            this.y += this.vy;

            // 2. Interaction: Flow / Drag (Reacts to movement, not position)
            if (mouse.active) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const influenceRadius = 250;

                if (distance < influenceRadius) {
                    const force = (influenceRadius - distance) / influenceRadius;

                    // A. Drag Force: Push particles in direction of mouse movement
                    // This creates a "wake" or "wind" effect
                    this.vx += mouse.vx * force * 0.05;
                    this.vy += mouse.vy * force * 0.05;

                    // B. Gentle Repulsion: Prevent clumping exactly at the tip
                    if (distance < 50) {
                        this.vx -= (dx / distance) * 0.5;
                        this.vy -= (dy / distance) * 0.5;
                    }
                }
            }

            // 3. Return to Flow (Damping towards original wandering speed, NOT original position)
            // We want them to wander freely, but maybe bounded?
            // Let's just dampen high velocities so they don't explode
            this.vx *= 0.96;
            this.vy *= 0.96;

            // Ensure min movement (don't stop completely)
            if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.1;
            if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.1;

            // 4. Wrap around edges
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';

            // Tail logic
            const trailLength = 12;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - this.vx * trailLength, this.y - this.vy * trailLength);
            ctx.stroke();

            // Glow
            ctx.globalAlpha = 0.2;
            ctx.lineWidth = this.size * 4;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const handleResize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                // Set internal resolution matches display size
                canvas.width = rect.width;
                canvas.height = rect.height;
                // Re-init particles
                particlesRef.current = Array.from({ length: 120 }).map(() => new Particle(canvas.width, canvas.height));
            }
        };

        // Throttle state for performance (P0-5)
        let lastMoveTime = 0;
        const THROTTLE_MS = 16; // ~60fps

        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();

            // Throttle: only process if enough time has passed
            if (now - lastMoveTime < THROTTLE_MS) {
                return;
            }
            lastMoveTime = now;

            const rect = canvas.getBoundingClientRect();
            const currentTime = now;
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            // Calculate Mouse Velocity
            const dt = currentTime - lastMousePos.current.time;
            if (dt > 0) {
                // Simple velocity
                mouseRef.current.vx = (currentX - lastMousePos.current.x);
                mouseRef.current.vy = (currentY - lastMousePos.current.y);
            }

            lastMousePos.current = { x: currentX, y: currentY, time: currentTime };
            mouseRef.current.x = currentX;
            mouseRef.current.y = currentY;
            mouseRef.current.active = true;
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
            mouseRef.current.vx = 0;
            mouseRef.current.vy = 0;
        };

        window.addEventListener('resize', handleResize);
        // Bind to parent for better hit area
        canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
        canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

        handleResize();

        const animate = () => {
            // Decay mouse velocity over time (inertia stop)
            mouseRef.current.vx *= 0.9;
            mouseRef.current.vy *= 0.9;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Very subtle background gradient
            if (mouseRef.current.active) {
                const gradient = ctx.createRadialGradient(
                    mouseRef.current.x, mouseRef.current.y, 0,
                    mouseRef.current.x, mouseRef.current.y, 400
                );
                gradient.addColorStop(0, 'rgba(66, 133, 244, 0.03)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            particlesRef.current.forEach(p => {
                p.update(canvas.width, canvas.height, mouseRef.current);
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
            canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-90"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
}
