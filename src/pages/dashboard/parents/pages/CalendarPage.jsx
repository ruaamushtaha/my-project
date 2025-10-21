import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaSchool, 
  FaCalendarDay, 
  FaBook, 
  FaUser,
  FaPlus,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useCalendarData } from '../hooks/useReports';
import { Card, Button } from '../components/ui';

/**
 * Component for displaying a calendar view
 * مكون لعرض التقويم
 */
const CalendarView = ({ events, currentDate, onDateChange }) => {
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Days of week in Arabic
  const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  
  // Month names in Arabic
  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handlePrevMonth = () => {
    onDateChange(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onDateChange(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <Card className="p-6">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {monthNames[month]} {year}
          </h2>
          <div className="flex gap-1">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevMonth}
              className="p-2"
            >
              <FaChevronRight className="text-sm" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleToday}
              className="px-3"
            >
              اليوم
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNextMonth}
              className="p-2"
            >
              <FaChevronLeft className="text-sm" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div 
            key={day} 
            className="text-center py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-24 border border-transparent"></div>;
          }
          
          const dayEvents = getEventsForDate(day);
          const isToday = new Date().getDate() === day &&
                          new Date().getMonth() === month &&
                          new Date().getFullYear() === year;
          
          return (
            <motion.div
              key={index}
              className={`
                h-24 border border-gray-200 dark:border-gray-700 rounded-lg p-1
                ${isToday ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' : ''}
                hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`text-right text-sm font-medium mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                {day}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map(event => {
                  let bgColor = 'bg-blue-100 dark:bg-blue-900/50';
                  let textColor = 'text-blue-800 dark:text-blue-200';
                  
                  if (event.type === 'holiday') {
                    bgColor = 'bg-red-100 dark:bg-red-900/50';
                    textColor = 'text-red-800 dark:text-red-200';
                  } else if (event.type === 'event') {
                    bgColor = 'bg-green-100 dark:bg-green-900/50';
                    textColor = 'text-green-800 dark:text-green-200';
                  } else if (event.type === 'exam') {
                    bgColor = 'bg-yellow-100 dark:bg-yellow-900/50';
                    textColor = 'text-yellow-800 dark:text-yellow-200';
                  } else if (event.type === 'personal') {
                    bgColor = 'bg-purple-100 dark:bg-purple-900/50';
                    textColor = 'text-purple-800 dark:text-purple-200';
                  }
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`text-xs px-1 py-0.5 rounded truncate ${bgColor} ${textColor}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  );
                })}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
                    +{dayEvents.length - 2} المزيد
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

/**
 * Component for displaying event details in a list
 * مكون لعرض تفاصيل الأحداث في قائمة
 */
const EventList = ({ events, loading }) => {
  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = new Date(event.date).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: new Date(event.date),
        events: []
      };
    }
    acc[dateKey].events.push(event);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
              <div className="space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <Card className="p-12 text-center">
        <FaCalendarAlt className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          لا توجد أحداث
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          لم يتم العثور على أي أحداث في التقويم
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((dateKey) => {
        const group = groupedEvents[dateKey];
        const date = group.date;
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        
        return (
          <motion.div
            key={dateKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex items-center gap-3 mb-4 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
              <div className="w-3 h-3 rounded-full bg-current"></div>
              <h3 className="text-lg font-bold">
                {date.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
            </div>
            
            <div className="space-y-3">
              {group.events.map((event) => {
                let icon = FaCalendarDay;
                let bgColor = 'bg-blue-100 dark:bg-blue-900/30';
                let borderColor = 'border-blue-300 dark:border-blue-700';
                let textColor = 'text-blue-800 dark:text-blue-200';
                
                if (event.type === 'school_date') {
                  icon = FaSchool;
                  bgColor = 'bg-green-100 dark:bg-green-900/30';
                  borderColor = 'border-green-300 dark:border-green-700';
                  textColor = 'text-green-800 dark:text-green-200';
                } else if (event.type === 'holiday') {
                  icon = FaCalendarAlt;
                  bgColor = 'bg-red-100 dark:bg-red-900/30';
                  borderColor = 'border-red-300 dark:border-red-700';
                  textColor = 'text-red-800 dark:text-red-200';
                } else if (event.type === 'event') {
                  icon = FaCalendarDay;
                  bgColor = 'bg-green-100 dark:bg-green-900/30';
                  borderColor = 'border-green-300 dark:border-green-700';
                  textColor = 'text-green-800 dark:text-green-200';
                } else if (event.type === 'exam') {
                  icon = FaBook;
                  bgColor = 'bg-yellow-100 dark:bg-yellow-900/30';
                  borderColor = 'border-yellow-300 dark:border-yellow-700';
                  textColor = 'text-yellow-800 dark:text-yellow-200';
                } else if (event.type === 'personal') {
                  icon = FaUser;
                  bgColor = 'bg-purple-100 dark:bg-purple-900/30';
                  borderColor = 'border-purple-300 dark:border-purple-700';
                  textColor = 'text-purple-800 dark:text-purple-200';
                }
                
                const IconComponent = icon;
                
                return (
                  <motion.div
                    key={event.id}
                    className={`border rounded-lg p-4 ${borderColor} hover:shadow-md transition-shadow`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${bgColor}`}>
                        <IconComponent className={textColor} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          {event.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>
                            {new Date(event.date).toLocaleDateString('ar-SA', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * Component for adding personal appointments
 * مكون لإضافة المواعيد الشخصية
 */
const AddAppointmentForm = ({ onAddAppointment, onCancel }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;
    
    setIsSubmitting(true);
    try {
      const appointment = {
        title,
        date,
        description,
        type: 'personal'
      };
      
      const result = await onAddAppointment(appointment);
      if (result.success) {
        setTitle('');
        setDate('');
        setDescription('');
        onCancel();
      }
    } catch (error) {
      console.error('Failed to add appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        إضافة موعد شخصي
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            العنوان *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="عنوان الموعد"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            التاريخ *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            الوصف
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="وصف الموعد"
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <Button 
            type="submit" 
            variant="primary"
            disabled={isSubmitting || !title || !date}
          >
            {isSubmitting ? 'جاري الإضافة...' : 'إضافة الموعد'}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={onCancel}
          >
            إلغاء
          </Button>
        </div>
      </form>
    </Card>
  );
};

/**
 * Calendar Page Component
 * مكون صفحة التقويم
 */
const CalendarPage = () => {
  const { events, loading, addAppointment } = useCalendarData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeView, setActiveView] = useState('calendar'); // 'calendar' or 'list'

  const handleAddAppointment = async (appointment) => {
    const result = await addAppointment(appointment);
    if (result.success) {
      setShowAddForm(false);
    }
    return result;
  };

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg">
              <FaCalendarAlt className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                التقويم
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                عرض التواريخ والفعاليات المهمة
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeView === 'calendar' ? 'primary' : 'outline'}
              onClick={() => setActiveView('calendar')}
            >
              <FaCalendarAlt className="ml-2" />
              التقويم
            </Button>
            <Button
              variant={activeView === 'list' ? 'primary' : 'outline'}
              onClick={() => setActiveView('list')}
            >
              <FaCalendarDay className="ml-2" />
              القائمة
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowAddForm(true)}
            >
              <FaPlus className="ml-2" />
              إضافة موعد
            </Button>
          </div>
        </div>
      </motion.div>

      {showAddForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <AddAppointmentForm 
            onAddAppointment={handleAddAppointment}
            onCancel={() => setShowAddForm(false)}
          />
        </motion.div>
      ) : null}

      {activeView === 'calendar' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CalendarView 
            events={events} 
            currentDate={currentDate} 
            onDateChange={setCurrentDate} 
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <EventList events={events} loading={loading} />
        </motion.div>
      )}
    </div>
  );
};

export default CalendarPage;