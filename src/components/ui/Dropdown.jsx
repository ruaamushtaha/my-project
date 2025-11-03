import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheck, FaSearch } from 'react-icons/fa';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'اختر من القائمة',
  searchable = false,
  className = '',
  error,
  label,
  required = false,
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <motion.button
        type="button"
        disabled={disabled}
        className={`
          w-full px-4 py-3 border-2 border-gray-200 rounded-xl
          focus:border-primary-500 focus:ring-2 focus:ring-primary-200
          transition-all duration-200 text-right
          dark:bg-gray-800 dark:border-gray-700 dark:text-white
          flex items-center justify-between
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}
          ${isOpen ? 'border-primary-500 ring-2 ring-primary-200' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <span className={selectedOption ? 'text-gray-900 dark:text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {searchable && (
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <div className="relative">
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-200 text-right dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    className={`
                      w-full px-4 py-3 text-right hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors
                      flex items-center justify-between
                      ${option.value === value ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}
                    `}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.02 }}
                  >
                    <span>{option.label}</span>
                    {option.value === value && <FaCheck className="text-primary-500" />}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                  لا توجد نتائج
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <motion.p
          className="text-sm text-red-500 flex items-center gap-1 mt-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Dropdown;
