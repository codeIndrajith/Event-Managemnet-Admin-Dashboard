import React from "react";
import type { IconType } from "react-icons";

interface HIMSTextareaFieldProps {
  Icon?: IconType;
  displayLabel?: string;
  isRequired?: boolean;
  placeholderText?: string;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  rows?: number;
  cols?: number;
  classNames?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement>;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const HIMSTextareaField = React.forwardRef<
  HTMLTextAreaElement,
  HIMSTextareaFieldProps
>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      placeholderText,
      extraInfo,
      error,
      iconSize = 14,
      rows = 3,
      cols = 1,
      classNames,
      name,
      onChange,
      onBlur,
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

        <textarea
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholderText}
          rows={rows}
          cols={cols}
          className={`w-full px-5 py-2.5 border border-gray-200 text-sm placeholder:text-xs focus:outline-none ${
            error
              ? "border-red-500"
              : "border-2 border-gray-400 focus:outline-gray-600"
          }`}
        />

        {error && (
          <small className="absolute bottom-1 left-0 text-red-600 text-[10px] text-red-500">
            {error}
          </small>
        )}
      </div>
    );
  }
);

export default HIMSTextareaField;
