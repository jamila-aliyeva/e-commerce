"use client";
import AccountForm from "@/components/form/accountPage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "./style.scss";
import useAuth from "@/store/auth";


const AccountPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  return (
    <section className="accountpage">
      <div className="container">
        <AccountForm />
      </div>
    </section>
  );
};

export default AccountPage;
