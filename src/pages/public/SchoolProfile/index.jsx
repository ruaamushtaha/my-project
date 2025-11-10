import React from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SchoolInfo from "../../public/SchoolProfile/components/SchoolInfo";
import Briefsummary from "../../public/SchoolProfile/components/Briefsummary";
import SchoolEvaluation from "../../public/SchoolProfile/components/SchoolEvaluation";
import GenerelEvaluation from "../../public/SchoolProfile/components/GenerelEvaluation";
import headerimg from '../../../assets/images/headerimg1.png';


export default function About() {
  return (
    <div className="flex flex-col min-h-screen font-cairo font-arabic bg-white" dir="rtl">
      {/* الهيدر */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative h-[210px]"
      >
        <img 
          src={headerimg} 
          alt="خلفية الهيدر" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/50 to-cyan-950/10"></div>
        <Header title="المدارس/مدرسة..." variant="default" />
      </motion.div>

      {/* نموذج التواصل */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SchoolInfo />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Briefsummary/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <SchoolEvaluation/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GenerelEvaluation/>
      </motion.div>
      
      {/* الفوتر */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Footer />
      </motion.div>
      
    </div>
  );
}