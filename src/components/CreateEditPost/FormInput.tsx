"use client";

import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  required,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="font-semibold text-lg">
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        required={required}
      />
    </div>
  );
};

export default FormInput;
