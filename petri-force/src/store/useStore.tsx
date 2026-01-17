import { create } from 'zustand';

export interface HaulItem {
    id: string;
    title: string;
    price: number;
    date: string;
}

interface BudgetState {
    monthlyBudget: number;
    haulItems: HaulItem[];
    addToHaul: (item: HaulItem) => void;
    removeFromHaul: (itemId: string) => void;
    getRemainingBalance: () => number;
}

export const useStore = create<BudgetState>((set, get) => ({
    monthlyBudget: 10000,
    haulItems: [],
    addToHaul: (item) =>
        set((state) => ({
            haulItems: [...state.haulItems, item]
        })),
    removeFromHaul: (itemId) =>
        set((state) => ({
            haulItems: state.haulItems.filter((i) => i.id !== itemId)
        })),
    getRemainingBalance: () => {
        const { monthlyBudget, haulItems } = get();
        const currentSpend = haulItems.reduce((sum, item) => sum + item.price, 0);
        return monthlyBudget - currentSpend;
    }
}));
