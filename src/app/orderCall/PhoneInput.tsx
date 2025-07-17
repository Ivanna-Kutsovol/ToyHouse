// PhoneInput.tsx
import React from "react";
import InputMask from "react-input-mask-next";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control<any>;
  name: string;
  className: string;
  errors?: FieldError;
  errorsClassName?: string;
}

const PhoneInput: React.FC<Props> = ({
  control,
  name,
  className,
  errors,
  errorsClassName,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: "Phone number is required",
          pattern: {
            value: /^\+1\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/,
            message: "Please enter a valid US phone number",
          },
        }}
        render={({ field }) => (
          <InputMask mask="+1 999 999 9999" {...field}>
            {(inputProps: any) => (
              <input
                {...inputProps}
                type="text"
                id={name}
                placeholder="+1 408 000 0000"
                className={className}
              />
            )}
          </InputMask>
        )}
      />
      {errors && <p className={errorsClassName}>{errors.message}</p>}
    </div>
  );
};

export default PhoneInput;
