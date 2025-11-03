import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { toast } from '../../../../hooks/use-toast';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    fullName: 'سارة أحمد',
    email: 'school.manager@example.com',
    phone: '+966501234569'
  });

  const handleSave = () => {
    toast({ title: 'تم حفظ التغييرات بنجاح' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h1 className="text-3xl font-bold rtl">إعدادات الحساب</h1>
      <Card>
        <CardHeader>
          <CardTitle className="rtl">الملف الشخصي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 rtl">
          <div>
            <label className="block text-sm font-medium mb-1">الاسم الكامل</label>
            <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2">
            <Save className="w-4 h-4" />
            حفظ التغييرات
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountSettings;
