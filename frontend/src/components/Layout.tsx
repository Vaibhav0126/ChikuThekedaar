import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppChat from "./WhatsAppChat";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Layout;
