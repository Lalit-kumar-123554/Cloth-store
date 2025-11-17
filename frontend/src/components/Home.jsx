import React from "react";
import { Link } from "react-router-dom";

import NewCollection from "./NewCollection";
import NewThisWeek from "./NewThisWeek";
import Collections from "./Collections";
import ApproachSection from "./ApproachSection";
import FooterSection from "./FooterSection";
export default function Home() {
  return (
    <div className="bg-[#f5f5f3] min-h-screen">
         
          <NewCollection />
          <NewThisWeek/>
          <Collections/>
          <ApproachSection/>
          <FooterSection/>
        </div>
  );
}
