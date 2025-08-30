import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// EmailInput
export const EmailInput = ({ value, onChange, onBlur, placeholder, error }) => {
  return (
    <div className="relative flex flex-col pb-3 mb-6 border-b border-gray-400 transition-all duration-300 ease-in-out focus-within:border-primary focus-within:shadow-sm">
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full pl-3 pr-10 text-gray-700 bg-transparent text-sm outline-none"
        />
        <FiMail className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 ease-in-out group-focus-within:text-primary" />
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

// PasswordInput
export const PasswordInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  showPassword,
  toggleShowPassword
}) => {
  return (
    <div className="relative flex flex-col pb-3 mb-6 border-b border-gray-400 transition-all duration-300 ease-in-out focus-within:border-primary focus-within:shadow-sm">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 text-gray-700 bg-transparent text-sm outline-none"
        />

        {/* أيقونة العين على اليسار */}
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-110"
        >
          {showPassword 
            ? <FiEye className="w-5 h-5 text-gray-400 hover:text-primary transition-colors duration-300 ease-in-out" /> 
            : <FiEyeOff className="w-5 h-5 text-gray-400 hover:text-primary transition-colors duration-300 ease-in-out" />}
        </button>

        {/* أيقونة القفل على اليمين */}
        <FiLock className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 ease-in-out group-focus-within:text-primary" />
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};
