import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children, fallback }) => {
  const user = useSelector((state) => state.user);

  // Optional loading state (if user data is async)
  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">
        Checking permissions...
      </div>
    );
  }

  if (!isAdmin(user.role)) {
    return (
      fallback || (
        <div className="p-4 bg-red-100 text-red-600 rounded text-center font-medium">
          You do not have permission to access this section.
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default AdminPermission;
