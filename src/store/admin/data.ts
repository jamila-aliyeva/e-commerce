import { create } from "zustand";

import { toast } from "react-toastify";
import request from "@/server";

interface CategoryValues {
  image: {
    public_id: string;
    url: string;
  } | null;
  name: string;
}

function getData<T>(url: string) {
  interface DataInterface {
    data: T[];
    total: number;
    photo: string | null;
    selected: string | null;
    ok: boolean;
    loading: boolean;
    values: CategoryValues;
    getData: () => void;
    handleOk: (e: React.FormEvent<HTMLFormElement>) => void;
    editData: (id: string) => void;
    deleteData: (id: string) => void;
    getValues: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePhoto: (e: React.FormEvent<HTMLInputElement>) => void;
    resetValues: () => void;
    setOk: (value: boolean) => void;
  }
  return create<DataInterface>()((set, get) => ({
    data: [],
    total: 0,
    photo: null,
    selected: null,
    loading: false,
    ok: false,
    values: {
      image: null,
      name: "",
    },
    getData: async () => {
      try {
        set((state) => ({ ...state, loading: true }));
        const { data } = await request.get(url);
        set((state) => ({ ...state, data: data, total: data.length }));
      } catch (err: object | any) {
        toast.error(err.response.data.msg || "Error");
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
    handleOk: async (e) => {
      e.preventDefault();
      const { values, selected, getData } = get();
      try {
        if (selected === null) {
          await request.post(url, values);
          getData();
          set((state) => ({ ...state, ok: true }));
        } else {
          await request.put(`${url}/${selected}`, values);
          getData();
          set((state) => ({ ...state, ok: true }));
        }
      } catch (err: object | any) {
        toast.error(err.response.data.msg || "Error");
      }
    },
    
    editData: async (id) => {
      const { data } = await request.get(`${url}/${id}`);
      const values: CategoryValues = {
        name: data.name,
        image: data.image,
      };
      set((state) => ({ ...state, values }));
      set((state) => ({ ...state, selected: id, isModalOpen: true }));
    },

   deleteData: async (id) => {
  try {
    await request.delete(`${url}/${id}`);
    get().getData();
  } catch (err) {
    console.log(err); 
  }
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
      set({ values: newValues });
    },
    getValues: (e) => {
      const { values } = get();
      set({
        values: { ...values, [e.currentTarget.id]: e.currentTarget.value },
      });
    },
    resetValues: () => {
      set({
        values: {
          image: null,
          name: "",
        },
        selected: null,
      });
    },
    setOk: async (value) => {
      await set({ ok: value });
      const { ok } = get();
    },
  }));
}

export default getData;
