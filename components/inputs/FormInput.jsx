import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// BaseInputWrapper
const BaseInputWrapper = ({ children, error }) => (
  <div className="mb-6 relative w-full">
    {children}
    {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
  </div>
);

// UsernameInput
export const UsernameInput = ({ value, onChange, onBlur, placeholder, error }) => (
  <BaseInputWrapper error={error}>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="
          w-full
          border-b-2 border-gray-300
          focus:border-blue-600
          outline-none
          bg-transparent
          text-gray-700
          h-10
          pl-3 pr-10
          transition-colors duration-300
        "
      />
      <FiUser className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
    </div>
  </BaseInputWrapper>
);

// EmailInput
export const EmailInput = ({ value, onChange, onBlur, placeholder, error }) => (
  <BaseInputWrapper error={error}>
    <div className="relative">
      <input
        type="email"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="
          w-full
          border-b-2 border-gray-300
          focus:border-blue-600
          outline-none
          bg-transparent
          text-gray-700
          h-10
          pl-3 pr-10
          transition-colors duration-300
        "
      />
      <FiMail className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
    </div>
  </BaseInputWrapper>
);

// PasswordInput
export const PasswordInput = ({ value, onChange, onBlur, placeholder, error, showPassword, toggleShowPassword }) => (
  <BaseInputWrapper error={error}>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="
          w-full
          border-b-2 border-gray-300
          focus:border-blue-600
          outline-none
          bg-transparent
          text-gray-700
          h-10
          pl-10 pr-10
          transition-colors duration-300
        "
      />
      {/* Eye toggle */}
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute left-2 top-1/2 -translate-y-1/2"
      >
        {showPassword
          ? <FiEye className="w-5 h-5 text-gray-400 hover:text-blue-600" />
          : <FiEyeOff className="w-5 h-5 text-gray-400 hover:text-blue-600" />
        }
      </button>

      {/* Lock icon */}
      <FiLock className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
    </div>
  </BaseInputWrapper>
);
