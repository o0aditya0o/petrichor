'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Scan, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Scan', href: '/scan', icon: Scan, isPrimary: true },
        { name: 'Profile', href: '/profile', icon: User },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
            <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl shadow-black/50">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={twMerge(
                                "relative flex flex-col items-center justify-center transition-all duration-300",
                                item.isPrimary ? "top-[-20px]" : ""
                            )}
                        >
                            {item.isPrimary ? (
                                // Primary 'Scan' Button styling
                                <div className={clsx(
                                    "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-primary/40 ring-4 ring-primary/20"
                                        : "bg-secondary text-white shadow-secondary/40"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            ) : (
                                // Standard Icon styling
                                <div className={clsx(
                                    "p-2 rounded-xl transition-colors",
                                    isActive ? "text-primary bg-primary/10" : "text-white/40 hover:text-white/80"
                                )}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            )}

                            {!item.isPrimary && (
                                <span className={clsx(
                                    "text-[10px] font-medium mt-1 transition-colors",
                                    isActive ? "text-primary" : "text-white/40"
                                )}>
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
