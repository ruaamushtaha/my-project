export default function StatCard({
  icon,
  value,
  description,
  height = "h-[250px]",
  dashArray,
  dashOffset,
  rotation,
}) {
  return (
    <div
      className={`relative bg-[#F2F3F0B5] rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center w-[340px] ${height} mt-10`}
    >
      <div className="absolute top-4 right-4 w-1 h-[80%] bg-primary rounded-full"></div>

      <div className="absolute top-4 left-4">
        <img src={icon} alt="أيقونة" className="w-10 h-10" loading="lazy" />
      </div>

      <div className="relative w-24 h-24 mb-4">
        <svg className="absolute top-0 left-0 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            stroke="#4CAF50"
            strokeWidth="8"
            fill="none"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(${rotation} 50 50)`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold text-black">
          {value}
        </div>
      </div>

      {/* النص التوضيحي */}
      <div className="text-sm font-cairo font-light text-black leading-relaxed">
        <p>{description}</p>
      </div>
    </div>
  );
}