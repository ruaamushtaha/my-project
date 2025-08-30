import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInput = ({ 
  name,
  icon: Icon, 
  error, 
  showPassword,
  toggleShowPassword,
  ...props 
}) => {
  return (
    <div className="relative flex flex-col border-b border-[#434343] pb-3 mb-8">
      <div className="relative">
        <input
          {...props}
          name={name}                     // مهم
          type={showPassword ? "text" : "password"}
          className={`w-full font-cairo font-thin outline-none bg-transparent 
            text-[#434343] text-[12px] pr-8 pl-10 ${error ? "border-red-500" : ""}`}
        />

        {Icon && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <Icon className="w-6 h-6 text-[#434343]" />
          </div>
        )}

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute left-0 top-1/2 transform -translate-y-1/2"
        >
          {showPassword ? <FiEye className="w-6 h-6 text-[#434343]" /> : <FiEyeOff className="w-6 h-6 text-[#434343]" />}
        </button>
      </div>

      {error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
};

export default PasswordInput;
