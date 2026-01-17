'use client';

import { useState } from 'react';
import { Share2, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import confetti from 'canvas-confetti';
import { TradeOffModal } from './TradeOffModal';

// Mock Data Dictionary (duplicated here or could be shared, keeping simple)
const MOCK_PRODUCTS: Record<string, { title: string; price: number; description: string; imageColor: string }> = {
    'new': {
        title: "Wireless Noise Canceling Headphones Pro",
        price: 2500,
        description: "Experience silence like never before. Industry-leading noise cancellation, 30-hour battery life, and ultra-premium comfort for those long deep-work sessions.",
        imageColor: "from-blue-500/20 to-purple-500/20"
    },
    'default': {
        title: "Ergonomic Mechanical Keyboard",
        price: 1800,
        description: "A typing experience satisfying enough to write a novel. Hot-swappable switches, gasket mount design, and per-key RGB lighting.",
        imageColor: "from-emerald-500/20 to-teal-500/20"
    }
};

interface ProductViewProps {
    id: string;
}

export function ProductView({ id }: ProductViewProps) {
    const router = useRouter(); // kept if needed later
    // In a real app we might fetch data here or have it passed from server. 
    // For this mock, we lookup based on ID.
    const product = MOCK_PRODUCTS[id] || MOCK_PRODUCTS['default'];
    const [isBuying, setIsBuying] = useState(false);
    const [showTradeOff, setShowTradeOff] = useState(false);

    const addToHaul = useStore((state) => state.addToHaul);
    const removeFromHaul = useStore((state) => state.removeFromHaul);
    const remainingBalance = useStore((state) => state.getRemainingBalance());

    const executePurchase = () => {
        // Trgger Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2dd4bf', '#3b82f6', '#ffffff']
        });

        // Add to Store
        addToHaul({
            id: Math.random().toString(36).substr(2, 9),
            title: product.title,
            price: product.price,
            date: new Date().toISOString()
        });

        // Redirect
        setTimeout(() => {
            router.push('/');
        }, 1000);
    };

    const handleBuy = () => {
        if (product.price > remainingBalance) {
            setShowTradeOff(true);
            return;
        }

        setIsBuying(true);

        // Simulate API call / Animation delay
        setTimeout(() => {
            executePurchase();
        }, 800);
    };

    const handleSwap = (returnedItemId: string) => {
        setShowTradeOff(false);
        setIsBuying(true);

        // Remove old item first
        removeFromHaul(returnedItemId);

        setTimeout(() => {
            executePurchase();
        }, 800);
    };

    return (
        <div className="min-h-screen pb-32 bg-background relative selection:bg-primary/30">
            {showTradeOff && (
                <TradeOffModal
                    newItemPrice={product.price}
                    onSwap={handleSwap}
                    onClose={() => setShowTradeOff(false)}
                />
            )}
            {/* Header Actions */}
            <div className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex items-center justify-between">
                <Link href="/scan" className="p-3 glass rounded-full text-white/80 hover:text-white transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex items-center gap-3">
                    <button className="p-3 glass rounded-full text-white/80 hover:text-white transition-colors">
                        <Share2 className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Product Image Area */}
            <div className={`w-full h-[50vh] bg-gradient-to-b ${product.imageColor} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

                {/* Mock Product Visual */}
                <div className="relative z-10 w-64 h-64 glass-card rounded-3xl flex items-center justify-center shadow-2xl shadow-black/50">
                    <ShoppingBag className="w-24 h-24 text-white/20" />
                </div>
            </div>

            {/* Content */}
            <div className="px-6 -mt-10 relative z-10">
                <div className="flex flex-col gap-2 mb-6">
                    <h1 className="text-3xl font-bold text-white leading-tight">
                        {product.title}
                    </h1>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-mono font-bold text-primary glow-text">
                            {product.price.toLocaleString()}
                        </span>
                        <span className="text-white/60 font-medium">Coins</span>
                    </div>
                </div>

                <p className="text-white/60 text-lg leading-relaxed mb-8">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleBuy}
                        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-xl shadow-[0_0_30px_rgba(45,212,191,0.4)] hover:shadow-[0_0_50px_rgba(45,212,191,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        {isBuying ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <span>Buy with Coins</span>
                                <span className="text-2xl">✨</span>
                            </>
                        )}
                    </button>

                    <button className="w-full py-4 rounded-2xl glass text-white/50 font-medium hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 group">
                        <Heart className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                        <span>Save for Later</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
