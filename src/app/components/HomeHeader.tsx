import React from "react";
import "./HomeHeader.css";
import Link from "next/link";
import Image from 'next/image';
import bookIcon from '../../../public/img/Vector.png';
import userIcon from '../../../public/img/userIcon.png'

function HomeHeader() {
  return (
    <>
      <header className="page-header">
        <div className="page-header-item"><Image className="bookIcon" src={bookIcon} alt="" width={25} height={25}/></div>
        <div className="page-header-item"><Link className="mainbtn" href="/home">Read with ME</Link></div>
        <div className="page-header-item"><Image className='userIcon' src={userIcon} alt="" width={30} height={30}></Image></div>
      </header>
      <nav className="nav">
        <div className="nav-item">Home</div>
        <div className="nav-item">My Library</div>
        <div className="nav-item">Calender</div>
        <div className="nav-item">Search</div>
        <div className="nav-item">Book club</div>
      </nav>
   
    </>
  );
}

export default HomeHeader;
