import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "لوحة التحكم";

    if (path.includes("schools")) pageTitle = "المدارس";
    else if (path.includes("complaints")) pageTitle = "الشكاوى";
    else if (path.includes("evaluations")) pageTitle = "التقييمات";
    else if (path.includes("notifications")) pageTitle = "الإشعارات";
    else if (path.includes("settings")) pageTitle = "الإعدادات";

    document.title = pageTitle;
  }, [location]);
};

export default usePageTitle;