"use client";
import request from "@/server";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Usertype from "@/types/user";

const AccountForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<Usertype | null>(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("auth/me");
        // console.log(data)
        setUserInfo(data);
        setFormValues({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          username: data.username || "",
          phoneNumber: data.phoneNumber || "",
        });
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [setUserInfo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = new FormData(event.currentTarget);
      const userData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        username: data.get("username"),
        phoneNumber: data.get("phoneNumber"),
      };

      await request.put("auth/update", userData);
      toast.success("Your information is saved successfully!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap">
      <div className="form-container" style={{ marginTop: "30px" }}>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Familiya"
              value={formValues.firstName}
              onChange={(e) =>
                setFormValues({ ...formValues, firstName: e.target.value })
              }
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Ism"
              value={formValues.lastName}
              onChange={(e) =>
                setFormValues({ ...formValues, lastName: e.target.value })
              }
            />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Foydalanuvchi nomi"
              value={formValues.username}
              onChange={(e) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
            />
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="+998 91 342 13 45"
              value={formValues.phoneNumber}
              onChange={(e) =>
                setFormValues({ ...formValues, phoneNumber: e.target.value })
              }
            />
            <button type="submit">o`zgartirish</button>
          </form>
        </div>
      </div>
      <div className="toggle-container">
        <div className="toggle-panel toggle-right">
          <h2>Sizngiz malumotlaringiz</h2>
          <p>O`zingizni ma`lumotlaringizni o`zgartira olishingiz mumkin!</p>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
