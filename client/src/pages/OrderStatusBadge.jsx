// components/OrderStatusBadge.jsx
import {
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const STATUS_MAP = {
  Processing: { label: "Processing", icon: <FaClock /> },
  Shipped: { label: "Shipped", icon: <FaTruck /> },
  Delivered: { label: "Delivered", icon: <FaCheckCircle /> },
  Cancelled: { label: "Cancelled", icon: <FaTimesCircle /> },
};

const OrderStatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || { label: status, icon: <FaClock /> };

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                     bg-gray-100 border border-gray-300 text-gray-700
                     text-xs font-medium">
      <span className="text-sm">{s.icon}</span>
      <span>{s.label}</span>
    </span>
  );
};

export default OrderStatusBadge;
