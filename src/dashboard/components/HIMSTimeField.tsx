import React from "react";
import type { IconType } from "react-icons";

interface HIMSTimeFieldProps {
  Icon?: IconType;
  displayLabel?: string;
  isRequired?: boolean;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  classNames?: string;
  maxTime?: string;
  minTime?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
}

const HIMSTimeField = React.forwardRef<HTMLInputElement, HIMSTimeFieldProps>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      maxTime,
      minTime,
      name,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div
        className={`${classNames} flex flex-col gap-2 relative pb-5 max-h-max`}
      >
        {(displayLabel || Icon) && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary" fontSize={iconSize} />}
            <label className="text-sm text-label">
              {displayLabel}{" "}
              {isRequired && <span className="text-red-600">*</span>}
            </label>
          </div>
        )}
        {extraInfo && <small>{extraInfo}</small>}
        <input
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type="time"
          min={minTime}
          max={maxTime}
          className={`w-full custom-input border border-gray-200 p-2 focus:outline-none ${
            error
              ? "border-red-500"
              : "border-2 border-gray-400 focus:outline-gray-600"
          }`}
        />
        {error && (
          <small className="absolute bottom-1 left-0 text-[10px] text-red-500">
            {error}
          </small>
        )}
      </div>
    );
  }
);

export default HIMSTimeField;
