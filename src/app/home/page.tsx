import React from "react";
import HomeHeader from "@/app/components/HomeHeader";
import Image from "next/image";

function page() {
  return (
    <>
      <HomeHeader />
      <div className="img-container">
        <Image
          src="https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt=""
          width="500"
          height="500"
        />
      </div>
    </>
  );
}

export default page;
