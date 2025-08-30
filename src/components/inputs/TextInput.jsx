import React from "react";

export default function TextInput({ 
  type = "text", 
  name,         // ضروري
  value, 
  onChange, 
  onBlur,
  placeholder, 
  icon: Icon, 
  error 
}) {
  return (
    <div className="relative flex flex-col border-b border-[#434343] pb-3 mb-8">
      <div className="relative">
        <input
          type={type}
          name={name}          // مهم
          value={value}
          onChange={onChange}  // تمريره مباشرة من Formik
          onBlur={onBlur}      // تمريره مباشرة من Formik
          placeholder={placeholder}
          className={`w-full font-cairo font-thin outline-none bg-transparent 
            text-[#434343] text-[12px] pr-8 pl-10 ${error ? "border-red-500" : ""}`}
        />

        {Icon && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <Icon className="w-6 h-6 text-[#434343]" />
          </div>
        )}
      </div>

      {error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
}
