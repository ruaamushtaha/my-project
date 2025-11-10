import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "لوحة التحكم";

    if (path.includes("/dashboard/parents/schools") && !path.includes("/comparison")) pageTitle = "المدارس";
    else if (path.includes("/dashboard/parents/schools/comparison")) pageTitle = "مقارنة المدارس";
    else if (path.includes("/dashboard/parents/complaints")) pageTitle = "الشكاوى";
    else if (path.includes("/dashboard/parents/evaluations")) pageTitle = "التقييمات";
    else if (path.includes("/dashboard/parents/profile")) pageTitle = "الملف الشخصي";
    else if (path.includes("/dashboard/parents/chat")) pageTitle = "المحادثة";
    else if (path.includes("/dashboard/parents/notifications")) pageTitle = "الإشعارات";
    else if (path.includes("/dashboard/parents/settings")) pageTitle = "الإعدادات";
    else if (path.includes("/dashboard/parents/reports")) pageTitle = "التقارير";
    else if (path.includes("/dashboard/parents/calendar")) pageTitle = "التقويم";
    else if (path.includes("/dashboard/parents/test-notifications")) pageTitle = "اختبار الإشعارات";
    else if (path.includes("/dashboard/parents/reset-data")) pageTitle = "إعادة تعيين البيانات";
    else if (path.includes("/dashboard/parents/test-shared-notifications")) pageTitle = "اختبار الإشعارات المشتركة";

    document.title = pageTitle;
  }, [location]);
};

export default usePageTitle;