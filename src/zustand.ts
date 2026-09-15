import { create, type StoreApi, type UseBoundStore } from "zustand";

interface WaitlistState {
  waitlistOpen: boolean;
  setWaitlistOpen: Function;
  waitlistCount: number;
  setWaitlistCount: Function;
}

interface DashBoardState {
  downloadModal: boolean;
  setDownloadModal: Function;
  userCount: number;
  setUserCount: Function;
}

export const useWaitlistOpen: UseBoundStore<StoreApi<WaitlistState>> = create(
  (set) => {
    return {
      waitlistOpen: false,
      setWaitlistOpen: (val: boolean) => set({ waitlistOpen: val }),
      waitlistCount: 0,
      setWaitlistCount: (count: number) => {
        const lsCount = localStorage.getItem("COUNT");
        if (typeof lsCount === "number" && lsCount < count) {
          localStorage.setItem("COUNT", JSON.stringify(count));
        }
        set({ waitlistCount: count });
      },
    };
  },
);

export const useDashboard: UseBoundStore<StoreApi<DashBoardState>> = create(
  (set) => {
    return {
      downloadModal: false,
      setDownloadModal: (val: boolean) => set({ downloadModal: val }),
      userCount: 0,
      setUserCount: (count: number) => {
        const lsCount = localStorage.getItem("COUNT");
        if (typeof lsCount === "number" && lsCount < count) {
          localStorage.setItem("COUNT", JSON.stringify(count));
        }
        set({ userCount: count });
      },
    };
  },
);
