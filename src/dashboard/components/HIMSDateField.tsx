import React from "react";
import type { IconType } from "react-icons";

interface HIMSDateFieldProps {
  Icon?: IconType;
  displayLabel?: string;
  isRequired?: boolean;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  classNames?: string;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.Ref<HTMLInputElement>;
  isTypeDisable?: boolean;
  defaultDate?: string;
  isDisabled?: boolean;
}

const HIMSDateField = React.forwardRef<HTMLInputElement, HIMSDateFieldProps>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      maxDate,
      minDate,
      name,
      onChange,
      onBlur,
      isTypeDisable = false,
      defaultDate,
      isDisabled = false,
    },
    ref
  ) => {
    //let maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

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
          disabled={isDisabled}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={isTypeDisable ? (e) => e.preventDefault() : undefined}
          defaultValue={defaultDate}
          type="date"
          min={
            minDate
              ? `${minDate.getFullYear()}-${
                  (minDate.getMonth() + 1).toString().length === 1
                    ? `0${minDate.getMonth() + 1}`
                    : minDate.getMonth() + 1
                }-${
                  minDate.getDate().toString().length === 1
                    ? `0${minDate.getDate()}`
                    : minDate.getDate()
                }`
              : undefined
          }
          max={
            maxDate
              ? `${maxDate.getFullYear()}-${
                  (maxDate.getMonth() + 1).toString().length === 1
                    ? `0${maxDate.getMonth() + 1}`
                    : maxDate.getMonth() + 1
                }-${
                  maxDate.getDate().toString().length === 1
                    ? `0${maxDate.getDate()}`
                    : maxDate.getDate()
                }`
              : undefined
          }
          className={`w-full p-2 border border-gray-100 custom-input focus:outline-none ${
            error ? "border-red-500" : "border-gray-200 focus:outline-gray-600"
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

export default HIMSDateField;
