'use client';

import { useEffect, useState } from 'react';

export function ScanningOverlay() {
    const [text, setText] = useState('INITIALIZING...');

    useEffect(() => {
        const messages = [
            'ANALYZING PIXELS...',
            'DETECTING CURRENCY...',
            'EXTRACTING DESIRE...',
            'CALCULATING TRADE-OFF...',
            'TARGET ACQUIRED.'
        ];
        let i = 0;
        const interval = setInterval(() => {
            setText(messages[i % messages.length]);
            i++;
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center">
            {/* Scanning Line */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-2 bg-primary/50 shadow-[0_0_30px_#2dd4bf] animate-[scan_2s_ease-in-out_infinite]" />
            </div>

            {/* Central HUD */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-64 h-64 border-2 border-primary/30 rounded-lg relative overflow-hidden flex items-center justify-center bg-primary/5">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />

                    <span className="text-4xl animate-pulse">💠</span>
                </div>

                <div className="mt-8 font-mono text-primary font-bold text-xl tracking-widest glow-text">
                    {text}
                </div>
            </div>
        </div>
    );
}
