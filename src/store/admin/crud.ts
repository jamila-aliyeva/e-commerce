import request from "@/server";
import { toast } from "react-toastify";
import { create } from "zustand";

function getData<T>(url: string) {
  interface DataState {
    loading: boolean;
    total: number;
    search: string;
    selected: string | null;
    data: T[];
    photo: string | null;
    totalPage: number;
    active: number;
    isModalOpen: boolean;
    values: T | null;
    getValues: (e: React.FormEvent<HTMLInputElement>) => void;
    setActive: (active: number) => void;
    getData: () => void;
    addData: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
    showModal: () => void;
    handleCancel: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePhoto: (e: React.FormEvent<HTMLInputElement>) => void;
  }
  return create<DataState>()((set, get) => ({
    data: [],
    total: 0,
    photo: null,
    selected: null,
    search: "",
    loading: false,
    totalPage: 1,
    active: 1,
    isModalOpen: false,
    values: null,

    getData: async () => {
      const { search, active } = get();
      const params = {
        search: search,
        page: active,
        limit: 12,
      };
      try {
        set((state) => ({ ...state, loading: true }));
        const { data } = await request.get(url, { params });

        set((state) => ({
          ...state,
          data: data.users,
          total: data.total,
          totalPage: Math.ceil(data.total / 12),
        }));
        console.log(data);
      } catch (err) {
        toast.error("Malumot yuborishda xatolik!");
        console.log(err);
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },

    addData: async (e) => {
      e.preventDefault();
      const { selected, getData } = get();
      const { values } = get();
      try {
        if (selected === null) {
          await request.post(url, values);
          getData();
          set((state) => ({ ...state, isModalOpen: false }));
        } else {
          await request.put(`${url}/${selected}`, values);
          getData();
          set((state) => ({ ...state, isModalOpen: false }));
        }
      } catch (err) {
        toast.error("Serverda xatolik!");
      }
    },

    handleEdit: async (id) => {
      const { data } = await request.get(`${url}/${id}`);
      set((state) => ({ ...state, values: data }));
      set((state) => ({ ...state, selected: id, isModalOpen: true }));
    },

    handleDelete: async (id) => {
      try {
        await request.delete(`${url}/${id}`);
        get().getData();
      } catch (error) {
        toast.error("Serverda xatolik!!");
      }
    },

    showModal: () => {
      set({ values: null });
      set((state) => ({
        ...state,
        selected: null,
        photo: null,
        isModalOpen: true,
      }));
    },

    setActive: (active) => {
      set((state) => ({ ...state, active }));
      get().getData();
    },

    getValues: (e) => {
      const { values } = get();
      set({
        values: { ...values, [e.currentTarget.id]: e.currentTarget.value } as T,
      });
    },

    handleCancel: () => {
      set((state) => ({ ...state, isModalOpen: false, selected: null }));
    },

    handleSearch: (e) => {
      set((state) => ({ ...state, search: e.target.value }));
      get().getData();
    },

    handlePhoto: async (e) => {
      const formData = new FormData();
      if (e.currentTarget.files) {
        formData.append("file", e.currentTarget.files[0]);
      }
      const { data: photo } = await request.post("upload", formData);
      const { values } = get();
      const newValues = {
        ...values,
        image: photo,
      };
      set({ values: newValues as T });
    },
  }));
}

export default getData;
