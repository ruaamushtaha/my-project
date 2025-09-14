import React from "react";

import person from "../../../../assets/icons/person.svg";
import address from "../../../../assets/icons/address.svg";
import email from "../../../../assets/icons/email.svg";

export default function ContactCard() {
  return (
    <div className="flex flex-col min-h-screen font-cairo font-arabic bg-white" dir="rtl">
      
      {/* المحتوى الرئيسي */}
      <main className="flex-grow px-6 py-10">
        <div className="max-w-2xl mx-auto">

          {/* نموذج التواصل */}
          <div className="bg-[#CADBEA] rounded-xl shadow-md p-8">

            {/* العنوان */}
            <p className="text-primary text-center text-xl font-bold mb-6">
              شاركنا ما تودّ إخبارنا به!
            </p>

            <form className="space-y-6 flex flex-col items-start">

              {/* حقل الاسم */}
              <div className="w-full flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary bg-white">
                <img src={person} alt="اسم المستخدم" className="w-5 h-5 mr-3" />
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  className="w-full p-3 font-normal focus:outline-none bg-transparent"
                />
              </div>

              {/* حقل البريد الإلكتروني */}
              <div className="w-full flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary bg-white">
                <img src={email} alt="البريد الإلكتروني" className="w-5 h-5 mr-3" />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-3 font-normal focus:outline-none bg-transparent"
                />
              </div>

              {/* حقل العنوان */}
              <div className="w-full flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary bg-white">
                <img src={address} alt="العنوان" className="w-5 h-5 mr-3" />
                <input
                  type="text"
                  placeholder="العنوان"
                  className="w-full p-3 font-normal focus:outline-none bg-transparent"
                />
              </div>

              {/* حقل الرسالة */}
              <textarea
                placeholder="الرسالة.."
                className="w-full p-3 font-normal border border-gray-300 rounded-md h-40 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>

              {/* زر الإرسال */}
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-gray-100 transition duration-300"
                >
                  تواصل معنا
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}