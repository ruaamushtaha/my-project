import React, { useState } from 'react';
import { FaCamera, FaEllipsisH, FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { BsThreeDotsVertical, BsCalendarEvent, BsImages } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AiOutlineUserAdd } from 'react-icons/ai';

const SchoolProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [postContent, setPostContent] = useState('');

  // Sample data
  const schoolInfo = {
    name: 'مدرسة النموذجية الثانوية',
    description: 'مدرسة رائدة في تقديم تعليم متميز منذ عام 1995',
    coverPhoto: 'https://images.unsplash.com/photo-1523050853548-5d2c0fcb13d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    profilePicture: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    about: 'نحن مؤسسة تعليمية رائدة تهدف إلى تطوير مهارات الطلاب الأكاديمية والاجتماعية',
    location: 'الرياض، المملكة العربية السعودية',
    established: 'تأسست في 1995',
    students: '1200 طالب',
    teachers: '85 معلم',
  };

  const posts = [
    {
      id: 1,
      content: 'نعلن عن بدء التسجيل للعام الدراسي الجديد 2024-2025. يرجى مراجعة إدارة المدرسة للمزيد من التفاصيل.',
      time: 'منذ ساعة',
      likes: 45,
      comments: 12,
      shares: 5,
    },
    {
      id: 2,
      content: 'تهنئة لطلابنا المتفوقين في اختبارات الفصل الدراسي الأول. نتمنى لكم دوام التوفيق والنجاح.',
      time: 'منذ يومين',
      likes: 89,
      comments: 24,
      shares: 8,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">معلومات عن المدرسة</h3>
            <p className="text-gray-700 mb-4">{schoolInfo.about}</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-gray-600 ml-2">الموقع:</span>
                <span>{schoolInfo.location}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 ml-2">سنة التأسيس:</span>
                <span>{schoolInfo.established}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 ml-2">عدد الطلاب:</span>
                <span>{schoolInfo.students}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 ml-2">عدد المعلمين:</span>
                <span>{schoolInfo.teachers}</span>
              </div>
            </div>
          </div>
        );
      case 'photos':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">معرض الصور</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/400x400/?school,${item}`}
                    alt={`School ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">المناسبات القادمة</h3>
            <div className="space-y-4">
              {[
                'يوم الرياضيات',
                'حفل التخرج',
                'اليوم المفتوح',
                'مسابقة القرآن الكريم',
              ].map((event, index) => (
                <div key={index} className="flex items-center p-3 border-b border-gray-100">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 ml-3">
                    <BsCalendarEvent size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{event}</h4>
                    <p className="text-sm text-gray-500">15 أكتوبر 2024 • 09:00 ص</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
                  <HiOutlinePencilAlt className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="ما الجديد في مدرستك؟"
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-right focus:outline-none"
                  onClick={() => document.getElementById('postModal').classList.remove('hidden')}
                />
              </div>
              <div className="flex justify-between border-t pt-3">
                <button className="flex items-center text-gray-500 hover:bg-gray-100 px-3 py-1 rounded">
                  <FaCamera className="ml-1" />
                  <span>صورة</span>
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700">
                  نشر
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <img
                      src={schoolInfo.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full ml-3"
                    />
                    <div>
                      <h4 className="font-medium">{schoolInfo.name}</h4>
                      <p className="text-xs text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDotsVertical />
                  </button>
                </div>
                <p className="text-gray-800 mb-4">{post.content}</p>
                <div className="flex items-center justify-between text-gray-500 text-sm border-t border-b border-gray-100 py-2 my-2">
                  <span>{post.likes} إعجاب</span>
                  <div>
                    <span className="ml-3">{post.comments} تعليق</span>
                    <span>{post.shares} مشاركة</span>
                  </div>
                </div>
                <div className="flex justify-between pt-1">
                  <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:bg-gray-100 rounded">
                    <FaThumbsUp className="ml-1" />
                    <span>أعجبني</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:bg-gray-100 rounded">
                    <FaComment className="ml-1" />
                    <span>تعليق</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center py-2 text-gray-500 hover:bg-gray-100 rounded">
                    <FaShare className="ml-1" />
                    <span>مشاركة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Cover Photo */}
      <div className="relative rounded-t-lg overflow-hidden h-64 bg-gray-200">
        <img
          src={schoolInfo.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button className="absolute bottom-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-full flex items-center">
          <FaCamera className="ml-2" />
          <span>تعديل صورة الغلاف</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-b-lg shadow-sm -mt-16 relative px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row items-center md:items-end">
            <div className="relative -mt-16 md:-mt-20">
              <img
                src={schoolInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white"
              />
              <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <FaCamera />
              </button>
            </div>
            <div className="mt-4 md:mt-0 md:mr-6 text-center md:text-right">
              <h1 className="text-2xl font-bold">{schoolInfo.name}</h1>
              <p className="text-gray-600">{schoolInfo.description}</p>
            </div>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3 space-x-reverse">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <AiOutlineUserAdd className="ml-2" />
              <span>متابعة</span>
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center">
              <HiOutlinePencilAlt className="ml-2" />
              <span>تعديل الملف الشخصي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mt-6 overflow-hidden">
        <div className="flex border-b">
          {[
            { id: 'posts', label: 'المنشورات' },
            { id: 'about', label: 'حول' },
            { id: 'photos', label: 'الصور', icon: <BsImages className="ml-1" /> },
            { id: 'events', label: 'المناسبات', icon: <BsCalendarEvent className="ml-1" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-4 font-medium flex items-center ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolProfile;
