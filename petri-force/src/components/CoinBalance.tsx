'use client';

import { Coins } from "lucide-react";
import { useStore } from "@/store/useStore";

export function CoinBalance() {
    const remainingBalance = useStore((state) => state.getRemainingBalance());

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_0_15px_rgba(45,212,191,0.2)] border-primary/30">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse" />
                    <Coins className="w-5 h-5 text-primary relative z-10" />
                </div>
                <span className="text-foreground font-semibold tracking-wide font-mono">
                    <span className="text-primary glow-text">{remainingBalance.toLocaleString()}</span>
                </span>
            </div>
        </div>
    );
}
