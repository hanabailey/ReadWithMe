'use client'
import React from "react";
import styles from "@/app/bookClub/bookClub.module.scss";

//components
import HomeHeader from "../components/HomeHeader";
import DivisionLine from "../components/UI/DivisionLine";
import Buttons from "../components/BookClub/Buttons";
import BookClubCard from "../components/BookClub/BookClubCard";
import { useState } from "react";

const bookClub = () => {
  const containerWidth = 300; // 컨테이너 너비
  const numContainers = 3;    // 컨테이너 개수
  const scrollAmount = 320;    // 한 번에 스크롤할 양
  
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (scrollOffset) => {
    const newPosition = Math.max(0, Math.min(scrollPosition + scrollOffset, (numContainers - 1) * containerWidth));
    setScrollPosition(newPosition);
  };
  return (
    <>
      <HomeHeader />
      <Buttons />
      <DivisionLine />

      {/* 내가 가입한 북클럽 */}
      <h2>My Book clubs</h2>
        <button className="scroll-button left" onClick={() => handleScroll(-scrollAmount)}>
        &lt;
      </button>
      <div className={styles.CardContainer}>
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
      </div>
      <button className="scroll-button right" onClick={() => handleScroll(scrollAmount)}>
        &gt;
      </button>
      <DivisionLine />
    </>
  );
};

export default bookClub;
