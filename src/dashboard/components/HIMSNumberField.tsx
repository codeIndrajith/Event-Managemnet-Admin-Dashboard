import React from "react";
import type { IconType } from "react-icons";

interface HIMSNumberFieldProps {
  Icon?: IconType;
  displayLabel?: string;
  isRequired?: boolean;
  placeholderText?: string;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  classNames?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
  isDisabled?: boolean;
}

const HIMSNumberField = React.forwardRef<
  HTMLInputElement,
  HIMSNumberFieldProps
>(
  (
    {
      Icon,
      displayLabel,
      isRequired,
      placeholderText,
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      min,
      max,
      step,
      name,
      onChange,
      onBlur,
      isDisabled = false,
    },
    ref
  ) => {
    return (
      <div className={`${classNames} flex flex-col gap-2 relative pb-5`}>
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
          type="number"
          disabled={isDisabled}
          placeholder={placeholderText}
          className={`w-full p-2 border border-gray-200 custom-input focus:outline-none ${
            error
              ? "border-red-500"
              : "border-2 border-gray-400 focus:outline-gray-600"
          }`}
          min={min !== undefined ? min.toString() : undefined}
          max={max !== undefined ? max.toString() : undefined}
          step={step !== undefined ? step.toString() : undefined}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />

        {error && (
          <small className="absolute bottom-0 left-0 text-red-600 text-[10px] text-red-500">
            {error}
          </small>
        )}
      </div>
    );
  }
);

export default HIMSNumberField;
