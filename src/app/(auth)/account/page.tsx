import AccountForm from "@/components/form/accountPage";
import React from "react";

import "./style.scss";

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
