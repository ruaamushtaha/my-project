import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../../components/ui';

const SettingsPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rtl">
    <Card><div className="text-center py-12"><h2 className="text-2xl font-bold">الإعدادات</h2><p className="text-gray-600">قريباً...</p></div></Card>
  </motion.div>
);

export default SettingsPage;
