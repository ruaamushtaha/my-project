import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const showAlert = (type, message) => {
  MySwal.fire({
    icon: type, // "success" or "error"
    title: message,
    confirmButtonColor: "#4682B4", // لون الأزرار الأساسي عندك
    customClass: {
      popup: "rounded-xl", // للحواف المدورة
    },
  });
};
