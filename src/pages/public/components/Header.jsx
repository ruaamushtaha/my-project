import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/LOGO.svg";
import headerImg from "../../../assets/images/headerimg1.png";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ title = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: "/", label: "الرئيسيّة" },
    { to: "/About", label: "عن المنصّة" },
    { to: "/Services", label: "الخدمات" },
    { to: "/Objectives", label: "الأهداف" },
    { to: "/Schools", label: "المدارس" },
    { to: "/Ratings", label: "التقييمات" },
    { to: "/Contact", label: "تواصل معنا" }
  ];

  return (
    <header
      className="relative h-[210px] bg-cover bg-center text-white font-cairo font-arabic"
      style={{ backgroundImage: `url(${headerImg})` }}
      dir="rtl"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 to-blue-950/50 z-0"></div>

      {/*  nav bar*/}
      <nav className="relative z-10 px-4 md:px-6 lg:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/*  logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <img src={Logo} alt="شعار المنصة" className="w-10 h-10 md:w-16 md:h-16" />
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex gap-1 md:gap-4 lg:gap-6 text-xs md:text-sm lg:text-base font-medium">
            {navItems.map(({ to, label }) => (
              <motion.li
                key={to}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-1 md:px-2 text-yellow-300 font-bold"
                      : "block py-2 px-1 md:px-2 text-white hover:text-yellow-300 transition duration-300"
                  }
                >
                  {label}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </motion.li>
            ))}
          </ul>

          {/* Auth Buttons - Improved styling */}
          <div className="flex gap-1 md:gap-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/login"
                className="px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium text-white bg-primary rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center gap-1 md:gap-2 shadow-lg shadow-blue-500/20"
              >
                تسجيل الدخول
              </NavLink>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <NavLink
                to="/register"
                className="px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm font-medium text-white bg-transparent border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-1 md:gap-2"
              >
                إنشاء حساب
              </NavLink>
            </motion.div>

            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu} 
              className="md:hidden text-white self-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-gradient-to-b from-blue-900/95 to-blue-900/70 backdrop-blur-lg rounded-lg mt-2 absolute top-full left-0 right-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map(({ to, label }, index) => (
                  <motion.div
                    key={to}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={to}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "block py-3 px-4 text-yellow-300 font-bold rounded-lg"
                          : "block py-3 px-4 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 text-right"
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="pt-2 border-t border-white/10 mt-2">
                  <NavLink
                    to="/login"
                    onClick={toggleMenu}
                    className="block w-full py-3 px-4 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200 mb-2"
                  >
                    تسجيل الدخول
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={toggleMenu}
                    className="block w-full py-3 px-4 text-center text-white border-2 border-white/30 hover:bg-white/10 rounded-lg font-medium transition-colors duration-200"
                  >
                    إنشاء حساب جديد
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* title */}
      <div className="absolute inset-0 flex items-center justify-center z-10 mt-10 md:mt-14">
        <h1 className="text-xl md:text-2xl font-bold px-4 py-2 md:px-6 md:py-3">
          {title}
        </h1>
      </div>
    </header>
  );
}