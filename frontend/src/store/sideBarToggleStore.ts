import {create} from 'zustand';

interface SideBarToggleState {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
}

export const useSideBarToggleStore = create<SideBarToggleState>((set) => ({
    isOpen: true,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));