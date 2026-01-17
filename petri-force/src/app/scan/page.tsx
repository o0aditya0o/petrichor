'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Camera } from 'lucide-react';
import { ScanningOverlay } from '@/components/ScanningOverlay';

export default function ScanPage() {
    const router = useRouter();
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = () => {
        setIsScanning(true);
        // Simulate processing time
        setTimeout(() => {
            router.push('/product/new');
        }, 2500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-32 relative overflow-hidden">
            {/* Background Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />

            {isScanning && <ScanningOverlay />}

            <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full text-center">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2">
                        Drop the Impulse
                    </h1>
                    <p className="text-white/50 text-lg">
                        Upload a screenshot to analyze the <br /> true cost of your desire.
                    </p>
                </div>

                {/* Pulsing Drop Zone */}
                <button
                    onClick={handleScan}
                    className="group relative w-64 h-64 rounded-3xl glass flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(45,212,191,0.15)] cursor-pointer"
                    aria-label="Upload Screenshot"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Upload className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
                    </div>

                    <span className="text-white/60 font-medium group-hover:text-primary transition-colors">
                        Tap to Upload
                    </span>
                </button>

                <div className="flex items-center gap-4 w-full">
                    <div className="h-[1px] flex-1 bg-white/10" />
                    <span className="text-white/20 text-sm">OR</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                </div>

                <button
                    onClick={handleScan}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all"
                >
                    <Camera className="w-4 h-4" />
                    <span>Simulate Camera Scan</span>
                </button>
            </div>
        </div>
    );
}
