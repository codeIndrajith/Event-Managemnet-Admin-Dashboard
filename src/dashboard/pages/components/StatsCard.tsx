// src/components/StatsCard.tsx
import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  Icon: React.ElementType;
  color: "indigo" | "yellow" | "green" | "blue" | "red" | "purple";
  ImageLink?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  Icon,
  color,
  ImageLink,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 h-[200px] relative text-white"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.09)), url(${ImageLink})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-white bg-opacity-30`}>
          <span className="material-icons-outlined">
            <Icon className="size-6 text-black" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
