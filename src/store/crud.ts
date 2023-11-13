import { create } from "zustand";

import request from "@/server";
import { LIMIT } from "@/constants";
import { PaginationDataTypes } from "@/types";

const crud = <T>(url: string) => {
  interface ApiData {
    pagination: PaginationDataTypes;
    data: T[];
  }

  interface ClientOfDataStoreType {
    loading: boolean;
    loadingPhoto: boolean;
    activePage: number;
    search: string;
    selected: string | null;
    data: T[];
    total: number;
    isModalOpen: boolean;
    isModalLoading: boolean;
    photoUserData: string | null;
    urlProtocol: string;
    setActivePage: (page: number) => void;
    getData: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  return create<ClientOfDataStoreType>()((set, get) => ({
    loading: false,
    loadingPhoto: false,
    data: [],
    search: "",
    selected: null,
    isModalOpen: false,
    isModalLoading: false,
    activePage: 1,
    total: 0,
    activeTab: "1",
    photoData: null,
    photoUserData: null,
    urlProtocol: "",

    getData: async () => {
      try {
        set((state) => ({ ...state, loading: true }));
        const params = {
          search: get().search,
          page: get().activePage,
          limit: LIMIT,
        };
        const {
          data: { data, pagination = { total: 0 } },
        } = await request.get<ApiData>(url, {
          params,
        });
        set((state) => ({ ...state, data, total: pagination.total }));
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },

    setActivePage: async (page) => {
      set((state) => ({ ...state, activePage: page }));
      get().getData();
    },

    handleSearch: async (e) => {
      set((state) => ({ ...state, search: e.target.value }));
      await get().getData();
      set((state) => ({ ...state, loading: false }));
    },
  }));
};

export default crud;
