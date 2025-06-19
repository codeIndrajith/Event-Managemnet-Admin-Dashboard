// src/components/StatsCard.tsx
import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  Icon: React.ElementType;
  color: "indigo" | "yellow" | "green" | "blue" | "red" | "purple";
}

const colorClasses = {
  indigo: "bg-indigo-100 text-indigo-600",
  yellow: "bg-yellow-100 text-yellow-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, Icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>
          <span className="material-icons-outlined">
            <Icon className="size-6" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
