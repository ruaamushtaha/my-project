export default function ServiceCard({ icon, title, desc }) {
  return (
    <div className="font-cairo bg-white w-[300px] h-[240px] p-6 rounded-lg shadow-md flex flex-col items-center justify-start text-center">
      <img
        src={icon}
        alt={`${title} icon`}
        className="w-12 h-12 mt-2"
      />
      <h3 className="text-[#002147]  font-semibold mt-1 whitespace-pre-line">
        {title}
      </h3>
      <p className="text-[#5F5959] text-sm  font-light mt-2 whitespace-pre-line ">
        {desc}
      </p>
    </div>
  );
}
