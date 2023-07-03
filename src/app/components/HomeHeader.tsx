import React from "react";
import styles from "./HomeHeader.module.scss";
import Link from "next/link";
import Image from 'next/image';
import bookIcon from '../../../public/img/Vector.png';
import userIcon from '../../../public/img/userIcon.png'

function HomeHeader() {
  return (
    <>
    <header className={styles.pageHeader}>
        <div><Image className="bookIcon" src={bookIcon} alt="" width={25} height={25}/></div>
        <div><Link href="/home">Read with ME</Link></div>
        <div><Image className='userIcon' src={userIcon} alt="" width={30} height={30}></Image></div>
    </header>
      
      <nav className={styles.nav}>
        <div><Link href='/home'>Home</Link></div>
        <div><Link href='/myLibrary'>My Library</Link></div>
        <div><Link href='/calander'>Calender</Link></div>
        <div><Link href='/search'>Search</Link></div>
        <div><Link href='/bookClub'>Book club</Link></div>
      </nav>
   
    </>
  );
}

export default HomeHeader;
