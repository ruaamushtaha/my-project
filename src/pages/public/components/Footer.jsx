import instagram from "../../../assets/icons/instagram.svg";
import facebook from "../../../assets/icons/facebook.svg";
import twitter from "../../../assets/icons/twitter.svg";



export default function Footer() {
  return (
    <footer className="bg-babyBlue text-black py-8 mt-12 font-cairo " dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">

        <div>
          <h3 className="font-medium mb-2">أقسام المنصّة</h3>
          <ul className="space-y-4">
            <li><a href="/about" className="hover:underline  font-light">عن المنصّة</a></li>
            <li><a href="/services" className="hover:underline font-light">الخدمات</a></li>
            <li><a href="/objectives" className="hover:underline  font-light">الأهداف</a></li>
            <li><a href="/evaluate" className="hover:underline  font-light">التقييمات</a></li>
            <li><a href="/schools" className="hover:underline  font-light">المدارس</a></li>
          </ul>
        </div>

        <div className="md:border-r md:border-[#E3E8E9] md:pr-4">
          <h3 className=" font-medium mb-2 ">روابط سريعة</h3>
          <ul className="space-y-4">
            <li><a href="/" className="hover:underline  font-light">سياسة الخصوصيّة</a></li>
            <li><a href="/" className="hover:underline font-light">الأسئلة الشائعة</a></li>
          </ul>
        </div>

        <div className="md:border-r md:border-[#E3E8E9] md:pr-4">
          <h3 className=" font-medium mb-2">تواصل معنا</h3>
          <ul className="space-y-4">
            <li><a href="/" className="hover:underline  font-light">البريد الإلكتروني</a></li>
            <li><a href="/" className="hover:underline  font-light">اتصل بنا</a></li>
            <li><a href="/" className="hover:underline  font-light">الشكاوي</a></li>
          </ul>
        </div>

      
        <div className="md:border-x md:border-[#E3E8E9] md:pr-4">
          <h3 className="font-medium mb-2">تابعنا</h3>
          <ul className="space-y-4 items-center mt-2">
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="w-6 h-6" />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" className="w-6 h-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="mx-40 mt-8" />
      <div
        className="text-center text-sm mt-4 "
        style={{ direction: "ltr", unicodeBidi: "plaintext"}}
>
         © 2025 Ru’a Platform, All Rights Reserved.
      </div>
    </footer>
);
}




