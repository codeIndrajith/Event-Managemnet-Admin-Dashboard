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
      className="group bg-white rounded-lg shadow p-4 h-[180px] relative text-white overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.09)), url(${ImageLink})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay on hover */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-transparent before:opacity-0 group-hover:before:opacity-40 transition-opacity duration-800 rounded-lg z-0" />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-lg font-medium text-white">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-white bg-opacity-30">
          <span className="material-icons-outlined">
            <Icon className="size-6 text-black" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
