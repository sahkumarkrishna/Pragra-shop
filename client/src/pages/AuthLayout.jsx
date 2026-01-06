import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
