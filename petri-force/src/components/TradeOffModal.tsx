'use client';

import { useState } from 'react';
import { useStore, HaulItem } from '@/store/useStore';
import { ArrowRightLeft, X } from 'lucide-react';

interface TradeOffModalProps {
    newItemPrice: number;
    onSwap: (returnedItemId: string) => void;
    onClose: () => void;
}

export function TradeOffModal({ newItemPrice, onSwap, onClose }: TradeOffModalProps) {
    const haulItems = useStore((state) => state.haulItems);
    const remainingBalance = useStore((state) => state.getRemainingBalance());
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const selectedItem = haulItems.find(i => i.id === selectedItemId);
    const potentialBalance = remainingBalance + (selectedItem?.price || 0);
    const canAfford = potentialBalance >= newItemPrice;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm glass-card rounded-3xl p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Out of Coins! 😱</h2>
                <p className="text-white/60 mb-6">
                    To buy this, you must sacrifice something from your haul.
                </p>

                {haulItems.length === 0 ? (
                    <div className="p-4 bg-white/5 rounded-xl text-center text-white/40 mb-6">
                        Your haul is empty. You simply cannot afford this yet.
                    </div>
                ) : (
                    <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                        {haulItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedItemId(item.id)}
                                className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${selectedItemId === item.id
                                        ? 'bg-primary/20 border border-primary text-white shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                                        : 'bg-white/5 border border-white/5 text-white/60 hover:bg-white/10'
                                    }`}
                            >
                                <span className="font-medium truncate mr-4">{item.title}</span>
                                <span className="font-mono text-primary font-bold">{item.price.toLocaleString()}</span>
                            </button>
                        ))}
                    </div>
                )}

                {selectedItem && (
                    <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                        <div className="flex justify-between mb-1 text-white/60">
                            <span>Current Balance:</span>
                            <span>{remainingBalance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-1 text-red-400">
                            <span>Return refund:</span>
                            <span>+{selectedItem.price.toLocaleString()}</span>
                        </div>
                        <div className="h-[1px] bg-white/10 my-2" />
                        <div className={`flex justify-between font-bold ${canAfford ? 'text-primary' : 'text-red-500'}`}>
                            <span>New Potential Balance:</span>
                            <span>{potentialBalance.toLocaleString()}</span>
                        </div>
                        {!canAfford && (
                            <div className="mt-2 text-red-400 text-xs text-center">
                                Still need {(newItemPrice - potentialBalance).toLocaleString()} more coins!
                            </div>
                        )}
                    </div>
                )}

                <button
                    disabled={!canAfford}
                    onClick={() => selectedItemId && onSwap(selectedItemId)}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${canAfford
                            ? 'bg-primary text-primary-foreground hover:scale-[1.02] shadow-[0_0_20px_rgba(45,212,191,0.3)]'
                            : 'bg-white/10 text-white/20 cursor-not-allowed'
                        }`}
                >
                    <ArrowRightLeft className="w-5 h-5" />
                    <span>Confirm Swap</span>
                </button>
            </div>
        </div>
    );
}
