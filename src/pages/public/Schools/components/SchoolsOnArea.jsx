import React from "react";

import Infinity from "../../../../assets/icons/Infinity.svg";
import mapimg from "../../../../assets/images/mapimg.png";

export default function SchoolsOnArea() {
  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      <section className="py-16 px-4 bg-white">
        <div className="relative w-full pb-8">
          <img src={Infinity} alt="Infinity" />

          <h2 className="absolute top-1/2 transform -translate-y-1/2 text-2xl font-cairo font-bold text-secondary z-10 mr-8">
            المدارس حسب المنطقة / المديرية
          </h2>
        </div>

        <img src={mapimg} alt="map" className="w-full h-auto" />
      </section>
    </div>
  );
}