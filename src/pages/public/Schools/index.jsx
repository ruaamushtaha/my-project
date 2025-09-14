import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";


import alfajr from "../../../assets/images/alfajr.png";
import alqema from "../../../assets/images/alqema.png";
import alawda from "../../../assets/images/alawda.png";

import SearchSection from "../Schools/components/SearchSection";
import BestSchools from "../Schools/components/BestSchools";
import SchoolsOnArea from "../Schools/components/SchoolsOnArea";

import StatisticsSection from "../Schools/components/StatisticsSection";
import AddedSchools from "../Schools/components/AddedSchools";




export default function Schools() {


  return (
    <div className="font-cairo bg-white text-black" dir="rtl">
      {/* الهيدر */}
      <Header title="المدارس" />





{/* Search Section */}
<SearchSection/>


{/* افضل المدارس */}



<BestSchools/>

{/* map  */}

<SchoolsOnArea/>



     {/*  الاحصائيات العامة */}
<StatisticsSection/>

{/* مضافة مرخرا */}


<AddedSchools/>


      {/* الفوتر */}
      <Footer />
    </div>
);
}
