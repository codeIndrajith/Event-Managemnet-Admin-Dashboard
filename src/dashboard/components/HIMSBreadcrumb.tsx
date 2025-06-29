import React from "react";

import { useNavigate } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa6";

interface HIMSBreadcrumbProps {
  links: {
    id: number;
    displayName: string;
    link: string;
    disabled?: boolean;
  }[];
}

const HIMSBreadcrumb: React.FC<HIMSBreadcrumbProps> = ({ links }) => {
  const navigate = useNavigate();

  const handleRouting = (link: string) => {
    if (link === "navigate-previous") {
      return navigate(-1);
    }
    navigate(link);
  };

  return (
    <div className="flex items-center gap-2">
      {links.map((li, index) => (
        <React.Fragment key={li.id}>
          <button
            type="button"
            className="text-disabled-ash-text text-sm font-bold text-blue-600 py-0.5 hover:text-red-500 cursor-pointer"
            onClick={() => !li.disabled && handleRouting(li.link)}
          >
            {li.displayName}
          </button>
          {index !== links.length - 1 && (
            <FaChevronRight fontSize={10} className="text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default HIMSBreadcrumb;
