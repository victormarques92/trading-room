import { create } from 'zustand';

type TabType = 'operations' | 'orders' | 'history';

type UiStore = {
  activeTab: TabType;
  setTab: (tab: TabType) => void;
  candleDuration: number;
  setCandleDuration: (value: number) => void;
};

export const useUiStore = create<UiStore>(set => ({
  activeTab: 'history',
  setTab: tab => set({ activeTab: tab }),
  candleDuration: 60,
  setCandleDuration: value => set({ candleDuration: value }),
}));
