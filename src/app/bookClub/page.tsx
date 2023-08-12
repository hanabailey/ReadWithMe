"use client";
import React from "react";
import styles from "@/app/bookClub/bookClub.module.scss";

//components
import HomeHeader from "../components/HomeHeader";
import DivisionLine from "../components/UI/DivisionLine";
import Buttons from "../components/BookClub/Buttons";
import BookClubCard from "../components/BookClub/BookClubCard";
import { useState } from "react";

const bookClub = () => {
  return (
    <>
      <HomeHeader />
      <Buttons />
      <DivisionLine />

      {/* 내가 가입한 북클럽 */}
      <div className={styles.titleContainer}>
        <h2>My Book clubs</h2>
        <button className={styles.viewAllButton}>View all</button>
      </div>

      <div className={styles.CardContainer}>
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
        <BookClubCard />
      </div>

      <DivisionLine />
    </>
  );
};

export default bookClub;
