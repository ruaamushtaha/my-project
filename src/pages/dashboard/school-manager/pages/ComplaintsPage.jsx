import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../../../../components/ui/card';
import mockComplaintsService from '../../../../services/mock/mockComplaintsService';
import { toast } from '../../../../hooks/use-toast';

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const response = await mockComplaintsService.getComplaints({});
      setComplaints(response.data);
    } catch (error) {
      toast({ title: 'خطأ في تحميل البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rtl">
        <h1 className="text-3xl font-bold">الشكاوى</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة الشكاوى من أولياء الأمور والمشرفين</p>
      </div>
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardContent className="p-6 rtl">
              <h3 className="text-lg font-bold mb-2">{complaint.subject}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{complaint.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span>من: {complaint.senderName}</span>
                <span className={`px-3 py-1 rounded-full ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {complaint.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default ComplaintsPage;
