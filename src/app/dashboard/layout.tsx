"use client";
import { Authenticated } from "convex/react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <Authenticated>
        <Sidebar />
      </Authenticated>
      <div className="flex-1 bg-black">
        <Header />

        <main>{children}</main>
      </div>
    </div>
  );
}
