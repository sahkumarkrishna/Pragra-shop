import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-lg shadow-sm border p-4">
              <UserMenu />
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="bg-white rounded-lg shadow-sm border p-4 min-h-[75vh]">
            <Outlet />
          </main>

        </div>
      </div>
    </section>
  );
};

export default Dashboard;
