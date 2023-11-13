import AccountForm from "@/components/form/accountPage";
import React from "react";

import "./style.scss";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Vodiy Parfum | Hisob",
  description: "Lorem ipusum ....",
};

const AccountPage = () => {
  return (
    <section className="accountpage">
      <div className="container">
        <AccountForm />
      </div>
    </section>
  );
};

export default AccountPage;
