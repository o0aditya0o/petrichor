'use client';

import { useStore } from "@/store/useStore";
import { Package, TrendingUp, Heart } from "lucide-react";
import Link from 'next/link';

export function Dashboard() {
    const haulItems = useStore((state) => state.haulItems);
    const savedItems = useStore((state) => state.savedItems);
    const monthlyBudget = useStore((state) => state.monthlyBudget);

    const currentSpend = haulItems.reduce((sum, item) => sum + item.price, 0);
    const savedValue = savedItems.reduce((sum, item) => sum + item.price, 0);
    const budgetProgress = (currentSpend / monthlyBudget) * 100;

    // Progress Color Logic
    const getProgressColor = (percent: number) => {
        if (percent > 90) return 'bg-red-400 shadow-[0_0_20px_rgba(248,113,113,0.4)]';
        if (percent > 60) return 'bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)]';
        return 'bg-primary shadow-[0_0_20px_rgba(45,212,191,0.4)]';
    };

    return (
        <div className="min-h-[80vh] flex flex-col gap-6 p-1">
            {/* Budget Card */}
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <h2 className="text-sm font-medium text-white/60 mb-1">Monthly Budget</h2>
                        <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                            <span>{Math.max(0, monthlyBudget - currentSpend).toLocaleString()}</span>
                            <span className="text-lg text-white/40 font-normal">left</span>
                        </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-full">
                        <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-black/20 rounded-full overflow-hidden mb-2">
                    <div
                        className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(budgetProgress)}`}
                        style={{ width: `${Math.min(100, budgetProgress)}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-white/40 font-medium">
                    <span>0%</span>
                    <span>{Math.round(budgetProgress)}% Used</span>
                    <span>100%</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-xs text-white/50">Spent</span>
                    <span className="text-xl font-bold text-white">{currentSpend.toLocaleString()}</span>
                </div>
                <div className="glass rounded-2xl p-4 flex flex-col gap-1">
                    <span className="text-xs text-white/50">Saved Logic</span>
                    <span className="text-xl font-bold text-emerald-400">{savedValue.toLocaleString()}</span>
                </div>
            </div>

            {/* Month's Haul List */}
            <div className="flex-1">
                <h3 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Month's Haul
                </h3>

                {haulItems.length === 0 ? (
                    <div className="h-40 glass rounded-2xl flex flex-col items-center justify-center text-white/40 gap-2">
                        <Package className="w-8 h-8 opacity-50" />
                        <p>No items yet. Go scan something!</p>
                        <Link href="/scan" className="mt-2 text-primary hover:underline font-medium text-sm">
                            Start Hunting
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-3 animate-in slide-in-from-bottom duration-500 fade-in">
                        {[...haulItems].reverse().map((item, i) => (
                            <div key={`${item.id}-${i}`} className="glass rounded-2xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                                        <span className="text-lg">🛍️</span>
                                    </div>
                                    <div>
                                        <div className="font-medium text-white group-hover:text-primary transition-colors">{item.title}</div>
                                        <div className="text-xs text-white/40">{new Date(item.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="font-mono font-bold text-white/80">
                                    -{item.price.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Saved Items Summary */}
            {savedItems.length > 0 && (
                <div className="mt-2">
                    <h3 className="text-sm font-bold text-white/60 mb-3 flex items-center gap-2 uppercase tracking-wider">
                        Saved for later ({savedItems.length})
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {[...savedItems].reverse().map((item) => (
                            <div key={item.id} className="min-w-[140px] glass rounded-xl p-3 flex flex-col gap-2">
                                <div className="w-full aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white/20" />
                                </div>
                                <div className="truncate text-xs font-medium text-white/80">{item.title}</div>
                                <div className="text-xs text-primary font-mono">{item.price.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
