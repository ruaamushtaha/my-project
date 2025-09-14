import React from "react";
import { NavLink} from "react-router-dom";
import Logo from "../../../assets/icons/LOGO.svg";
import headerImg from "../../../assets/images/headerimg1.png";

export default function Header({ title = ""}) {
  return (
    <header
      className="relative h-[210px] bg-cover bg-center text-white font-cairo font-arabic"
      style={{ backgroundImage: `url(${headerImg})`}}
      dir="rtl"
>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 to-blue-950/50 z-0"></div>

      {/*  nav bar*/}
      <nav className="relative z-10 px-6 md:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between gap-6">

          {/*  logo */}
          <img src={Logo} alt="شعار المنصة" className="w-16 md:w-20 h-16 md:h-20" />

          {/*  link ul */}
          

<ul className="hidden md:flex gap-4 md:gap-6 text-sm md:text-base  font-medium">
  {[
    { to: "/", label: "الرئيسيّة"},
    { to: "/About", label: "عن المنصّة"},
    { to: "/Services", label: "الخدمات"},
    { to: "/Objectives", label: "الأهداف"},
    { to: "/Schools", label: "المدارس"},
    { to: "/Evaluate", label: "التقييمات"},
    { to: "/Contact", label: "تواصل معنا"},
  ].map(({ to, label}) => (
    <li key={to}>
      <NavLink
        to={to}
        className={({ isActive}) =>
          isActive
? "block py-2 text-yallow font-bold"
: "block py-2 text-white hover:text-yellow-300 transition duration-300"
}
>
        {label}
      </NavLink>
    </li>
))}
</ul>



          {/* button */}
          <div className="flex gap-2 md:gap-3">
            <NavLink
              to="/login"
              className="bg-primary text-white px-4 md:px-5 py-5 rounded-md text-sm font-medium hover:bg-[#CADBEA] transition duration-300"
>
              تسجيل الدخول
            </NavLink>

            <NavLink
              to="/register"
              className="text-white px-4 md:px-5 py-5 border border-white rounded-md text-sm  font-medium hover:bg-gray-100 transition duration-300"
>
              إنشاء حساب
            </NavLink>
          </div>
        </div>
      </nav>

      {/* title */}
      <div className="absolute inset-0 flex items-center justify-center z-10 mt-14">
        <h1 className="text-2xl  font-bold px-6 py-3">
          {title}
        </h1>
      </div>
    </header>
);
}

