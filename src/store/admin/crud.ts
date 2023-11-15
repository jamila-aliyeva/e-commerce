import { LIMIT } from "@/constants";
import request from "@/server";
import PaginationDataTypes, { PhotoDataTypes } from "@/types";

// import dayjs from "dayjs";
import { create } from "zustand";

// import { PaginationDataTypes, PhotoDataTypes } from "../../types";

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
    photoData: PhotoDataTypes | null;
    photoUserData: string | null;
    urlProtocol: string;
    setActivePage: (page: number) => void;
    // setActiveTab: (key: string, form: any) => void;
    getData: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteData: (id: string) => void;
    addData: (form: any) => void;
    editData: (id: string, form: any) => void;
    showModal: (form: any) => void;
    closeModal: () => void;
    // handlePhoto: (info: UploadChangeParam<UploadFile>) => void;
    // handleUserPhoto: (info: UploadChangeParam<UploadFile>) => void;
    handleProtocol: () => void;
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

    showModal: (form) => {
      form.resetFields();
      set({
        isModalOpen: true,
        selected: null,
        photoData: null,
        photoUserData: null,
      });
    },

    closeModal: () => {
      set({ isModalOpen: false });
    },

    // handlePhoto: async (info) => {
    //   try {
    //     set({ loadingPhoto: true });
    //     const formdata = new FormData();
    //     formdata.append("file", info.file.originFileObj as RcFile);
    //     const { data } = await request.post<PhotoDataTypes>("upload", formdata);
    //     set({ photoData: data });
    //   } finally {
    //     set({ loadingPhoto: false });
    //   }
    // },

    // handleUserPhoto: async (info) => {
    //   try {
    //     set({ loadingPhoto: true });
    //     const formdata = new FormData();
    //     formdata.append("file", info.file.originFileObj as RcFile);
    //     const { data } = await request.post<string>("auth/upload", formdata);
    //     set({ photoUserData: data });
    //   } finally {
    //     set({ loadingPhoto: false });
    //   }
    // },

    handleProtocol: () => {},

    getData: async () => {
      try {
        set((state) => ({ ...state, loading: true }));
        const params = {
          search: get().search,
          page: get().activePage,
          limit: LIMIT,
        };
        const {
          data: {
            data,
            pagination: { total },
          },
        } = await request.get<ApiData>(url, {
          params,
        });
        set((state) => ({ ...state, data, total }));
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
      get().getData();
    },

    deleteData: async (id) => {
      try {
        set((state) => ({ ...state, loading: true }));
        await request.delete(`${url}/${id}`);
        set({ activePage: 1 });
        get().getData();
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },

    addData: async (form) => {
      try {
        set((state) => ({ ...state, loading: true }));
        let data = await form.validateFields();

        if (url === "experiences" || url === "education") {
          const start: string = data?.startDate?.toISOString().split("T")[0];
          const end: string = data?.endDate?.toISOString().split("T")[0];
          data = { ...data, startDate: start, endDate: end };
        }

        if (url === "portfolios") {
          data = { ...data, photo: get().photoData?._id };
        }

        if (url === "users") {
          data = { ...data, photo: get().photoUserData };
        }

        if (get().selected === null) {
          await request.post(url, data);
        } else {
          await request.put(`${url}/${get().selected}`, data);
        }

        set((state) => ({
          ...state,
          isModalOpen: false,
          loading: true,
          photoData: null,
          photoUserData: null,
        }));
        get().getData();
        form.resetFields();
      } finally {
        set((state) => ({
          ...state,
          loading: false,
          selected: null,
          photoData: null,
          photoUserData: null,
        }));
      }
    },
    editData: async (form, id) => {
      try {
        set((state) => ({
          ...state,
          selected: id,
          loading: true,
          isModalOpen: true,
        }));
        const { data } = await request.get(`${url}/${id}`);
        form.setFieldsValue({
          ...data,
          startDate: data?.startDate?.split("T")[0],
          endDate: data?.endDate?.split("T")[0],
        });
      } finally {
        set((state) => ({ ...state, selected: id, loading: false }));
      }
    },
  }));
};

export default crud;
