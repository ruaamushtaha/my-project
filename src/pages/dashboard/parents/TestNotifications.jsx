import React from 'react';
import { useNotifications, useParentProfile } from './hooks/useData';
import { FaTrophy, FaChartLine, FaStar, FaBell, FaGraduationCap } from 'react-icons/fa';

const TestNotifications = () => {
  const { notifications, unreadCount, loading, error } = useNotifications();
  const { profile: parentProfile } = useParentProfile();

  if (loading) {
    return <div className="p-4">Loading notifications...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  // Filter notifications to highlight achievements and improvements
  const achievementNotifications = notifications.filter(n => 
    n.type === 'achievement' || n.type === 'grades' || n.type === 'evaluation'
  );

  // Group notifications by type
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const type = notification.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(notification);
    return groups;
  }, {});

  // Get child name by school ID
  const getChildNameBySchoolId = (schoolId) => {
    if (!parentProfile || !parentProfile.children) return null;
    const child = parentProfile.children.find(child => child.school.id === schoolId);
    return child ? child.name : null;
  };

  return (
    <div className="p-4" dir="rtl">
      <h2 className="text-xl font-bold mb-4">إشعارات الأداء والإنجازات المدرسية</h2>
      
      {/* Parent Profile Section */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="font-medium">معلومات ولي الأمر:</p>
        {parentProfile ? (
          <div>
            <p className="font-semibold">{parentProfile.fullName}</p>
            <p>عدد الأبناء: {parentProfile.children?.length || 0}</p>
            <ul className="list-disc pr-5 mt-2">
              {parentProfile.children?.map((child, index) => (
                <li key={index} className="mb-1">
                  <span className="font-medium">{child.name}</span> - {child.school.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>جاري تحميل بيانات ولي الأمر...</p>
        )}
      </div>
      
      {/* Achievement Notifications Highlight */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center mb-3">
          <FaTrophy className="text-green-600 mr-2" />
          <h3 className="font-bold text-lg text-green-800">إنجازات وتحسينات المدارس</h3>
        </div>
        <p className="text-green-700 mb-3">الإشعارات الخاصة بتحقيق تحسينات أو إنجازات في مدارس أبنائك</p>
        
        {achievementNotifications.length > 0 ? (
          <div className="space-y-3">
            {achievementNotifications.map(notification => {
              const childName = notification.schoolId ? getChildNameBySchoolId(notification.schoolId) : null;
              return (
                <div key={notification.id} className="p-3 bg-white rounded-lg shadow-sm border border-green-100">
                  <div className="flex items-start">
                    {notification.type === 'achievement' && <FaTrophy className="text-green-500 mt-1 mr-2 flex-shrink-0" />}
                    {notification.type === 'grades' && <FaChartLine className="text-blue-500 mt-1 mr-2 flex-shrink-0" />}
                    {notification.type === 'evaluation' && <FaStar className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{notification.title}</p>
                      <p className="text-gray-700">{notification.message}</p>
                      {childName && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                            مدرسة {childName}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <FaBell className="mx-auto text-gray-400 text-2xl mb-2" />
            <p className="text-gray-600">لا توجد إشعارات عن إنجازات أو تحسينات حديثة</p>
          </div>
        )}
      </div>
      
      {/* All Notifications Section */}
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-3">جميع الإشعارات ({notifications.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(groupedNotifications).map(([type, notifs]) => (
            <div key={type} className="p-4 bg-white rounded-lg shadow border">
              <div className="flex items-center mb-2">
                {type === 'achievement' && <FaTrophy className="text-green-500 mr-2" />}
                {type === 'grades' && <FaGraduationCap className="text-blue-500 mr-2" />}
                {type === 'evaluation' && <FaStar className="text-yellow-500 mr-2" />}
                {type === 'meeting' && <FaBell className="text-purple-500 mr-2" />}
                {type === 'announcement' && <FaBell className="text-indigo-500 mr-2" />}
                {type === 'activity' && <FaBell className="text-teal-500 mr-2" />}
                <span className="font-medium capitalize">
                  {type === 'achievement' ? 'إنجازات' : 
                   type === 'grades' ? 'تحديث الدرجات' : 
                   type === 'evaluation' ? 'تقييمات' : 
                   type === 'meeting' ? 'اجتماعات' : 
                   type === 'announcement' ? 'إعلانات' : 
                   type === 'activity' ? 'أنشطة' : type}
                </span>
                <span className="mr-2 bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-xs">
                  {notifs.length}
                </span>
              </div>
              <ul className="space-y-2">
                {notifs.slice(0, 3).map(notification => {
                  const childName = notification.schoolId ? getChildNameBySchoolId(notification.schoolId) : null;
                  return (
                    <li key={notification.id} className="text-sm p-2 bg-gray-50 rounded">
                      <p className="font-medium">{notification.title}</p>
                      {childName && <p className="text-xs text-gray-600">أبناء: {childName}</p>}
                      <p className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleDateString('ar-SA')}
                      </p>
                    </li>
                  );
                })}
                {notifs.length > 3 && (
                  <li className="text-xs text-gray-500 text-center">
                    + {notifs.length - 3} إشعارات إضافية
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Raw Data Section */}
      <div>
        <p className="font-medium">الإشعارات الخام:</p>
        <p>الإشعارات غير المقروءة: {unreadCount}</p>
        <p>إجمالي الإشعارات: {notifications.length}</p>
        <ul className="list-disc pr-5 mt-2">
          {notifications.map(notification => {
            const childName = notification.schoolId ? getChildNameBySchoolId(notification.schoolId) : null;
            return (
              <li key={notification.id} className="mb-3 p-3 bg-white rounded border">
                <strong>{notification.title}</strong>: {notification.message} 
                <br />
                <span className="text-sm text-gray-600">
                  النوع: {notification.type} | 
                  المدرسة: {notification.schoolId || 'عامة'} | 
                  مقروء: {notification.read ? 'نعم' : 'لا'}
                </span>
                {childName && (
                  <div className="mt-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      أبناء: {childName}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TestNotifications;