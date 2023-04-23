import { create } from "zustand";

export interface StatsStore {
    steps: number;
}

const useStatsStore = create<StatsStore>((set) => ({
    steps: 0,
}));

export default useStatsStore;
