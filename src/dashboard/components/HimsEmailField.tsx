import React from "react";
import { MdEmail } from "react-icons/md";

interface HIMSEmailFieldProps {
  displayLabel?: string;
  isRequired?: boolean;
  placeholderText?: string;
  classNames?: string;
  isDisabled?: boolean;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const HIMSEmailField = React.forwardRef<HTMLInputElement, HIMSEmailFieldProps>(
  (
    {
      displayLabel = "Email",
      isRequired = false,
      placeholderText = "Enter your email",
      classNames,
      isDisabled = false,
      name,
      value,
      onChange,
      onBlur,
      error,
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${classNames}`}>
        {displayLabel && (
          <label
            htmlFor={name}
            className="flex items-center gap-2 text-gray-700 font-semibold mb-2"
          >
            <MdEmail className="text-blue-500 text-lg" /> {displayLabel}{" "}
            {isRequired && <span className="text-red-600">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type="email"
          id={name}
          name={name}
          disabled={isDisabled}
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-4 py-2 border focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-sm  transition duration-300`}
        />
        {error && (
          <small className="text-red-500 text-[10px] mt-1">{error}</small>
        )}
      </div>
    );
  }
);

export default HIMSEmailField;
