import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../../components/ui';
import { FaChalkboardTeacher } from 'react-icons/fa';

const TeachersPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rtl">
      <Card>
        <div className="text-center py-12">
          <FaChalkboardTeacher className="text-6xl text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">إدارة المعلمين</h2>
          <p className="text-gray-600 dark:text-gray-400">قريباً...</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default TeachersPage;
