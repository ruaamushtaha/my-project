import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let pageTitle = "لوحة التحكم";
    if (path.includes("complaints")) pageTitle = "الشكاوى";
    else if (path.includes("evaluations")) pageTitle = "التقييمات";
    else if (path.includes("settings")) pageTitle = "الإعدادات";
    else if (path.includes("profile")) pageTitle = "الملف الشخصي";
    else if (path.includes("schools")) pageTitle = "المدارس";
    else if (path.includes("reports")) pageTitle = "التقارير";
    else if (path.includes("calendar")) pageTitle = "التقويم";
    else if (path.includes("chat")) pageTitle = "المحادثة";
    else if (path.includes("notifications")) pageTitle = "الإشعارات";
    else if (path.includes("my-school")) pageTitle = "مدرستي";
    else if (path.includes("InvitationsPage")) pageTitle = "دعوات المدراء";

    document.title = pageTitle;
  }, [location]);
};

export default usePageTitle;