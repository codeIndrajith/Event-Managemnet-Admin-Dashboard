// components/Banner.tsx
import React from "react";

interface BannerProps {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  variant?: "primary" | "secondary" | "light";
}

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  actionText,
  onAction,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  variant = "primary",
}) => {
  // Variant styles
  const variantStyles = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-800 text-white",
    light: "bg-gray-50 text-gray-800 border border-gray-200",
  };

  // Button styles based on variant
  const buttonStyles = {
    primary: "bg-white text-blue-600 hover:bg-gray-100",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    light: "bg-blue-600 text-white hover:bg-blue-700",
  };

  return (
    <div
      className={`rounded-md overflow-hidden ${variantStyles[variant]} shadow-sm`}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Content Section */}
        <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-bold mb-3">{title}</h1>
          {description && (
            <p className="text-base md:text-md mb-6 opacity-90 max-w-lg">
              {description}
            </p>
          )}
          {actionText && (
            <button
              onClick={onAction}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors w-fit ${buttonStyles[variant]}`}
            >
              {actionText}
            </button>
          )}
        </div>

        {/* Image Section */}
        <div className="">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="object-cover w-[160px] md:w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
