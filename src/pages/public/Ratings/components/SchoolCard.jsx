import staryallow from "../../../../assets/icons/staryallow.svg";
import school from "../../../../assets/images/School 1.jpg";

export default function SchoolCard({ name, description, rating, votes, criteria }) {
  return (
    <div dir="rtl">
      
      {/* عنوان المدرسة ووصفها */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-black">{name}</h3>
        <p className="text-sm text-black font-normal">{description}</p>
      </div>

      {/* محتوى البطاقة */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-start w-full">

        {/* الصورة والتقييم */}
        <div className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          <img
            src={school}
            alt="صورة المدرسة"
            className="w-full h-32 object-cover rounded-lg"
          />

          <div className="flex justify-center items-center w-full gap-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-normal text-black">{votes}</span>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={staryallow}
                    alt="نجمة تقييم صفراء"
                    className={`w-4 h-4 ${i < Math.floor(rating) ? '' : 'opacity-30'}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-6xl font-bold">{rating}</div>
          </div>
        </div>

        {/* المعايير */}
        <div className="w-full md:w-1/2 space-y-4 mt-2">
          {criteria.map((item, i) => (
            <div key={i}>
              <p className="text-xs text-[#A3A3A3] font-light mb-1">{item.label}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#3D8C40] h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}