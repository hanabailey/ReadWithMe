"use client";
import React from "react";
import { useContext } from "react";

import HomeHeader from "../components/HomeHeader";
import { HabitTrackerPage } from "../components/Calendar/Calendar";
import styles from "@/app/calendar/calendar.module.scss";
import {
  UserBooksDetailContextProvider,
  useGlobalContext,
  userBooksDetailContext,
} from "@/app/context/userBooksData";

const Calendar = () => {


  return (
    <>
      <HomeHeader />
      <UserBooksDetailContextProvider>
        <h1 className={styles.title}>Book Calendar</h1>
        <HabitTrackerPage />
      </UserBooksDetailContextProvider>
    </>
  );
};

export default Calendar;
