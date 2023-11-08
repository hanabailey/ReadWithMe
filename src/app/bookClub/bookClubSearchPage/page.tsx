"use client";
import React, { useState, useEffect } from "react";
import HomeHeader from "../../components/HomeHeader";
import styles from "@/app/bookClub/bookClubSearchPage/bookClubSearchig.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BookClubCard from "@/app/components/BookClub/BookClubCard";

const BookClubSearching = () => {
  const supabase = createClientComponentClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from("book_clubs")
        .select("* ")
        // .contains("keywords", [searchTerm])
        .or(`name.ilike.%${searchTerm}%,keywords.cs.{${searchTerm}}`);

      // .or("keywords", `%${searchTerm}%`);
      // .or( `name.ilike.%${searchTerm}%.`,
      // `keywords.ilike.%${searchTerm}%.`);

      if (error) {
        console.error("에러", error);
      } else {
        setSearchResults(data);
        console.log(searchTerm);
      }
    } catch (error) {
      console.error("에러", error);
    }
  };




  return (
    <>
      <HomeHeader />
      <div className={styles.titleContainer}>
        <h1 className={styles.bookClubSearchTitle}>Search Book Clubs</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.input}
              placeholder="Seach for keywords or club name.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={styles.searchButton} onClick={handleSearch}>
              <FontAwesomeIcon
                className={styles.icon}
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <>
          <div className={styles.cardContainer}>
            {searchResults.map((club) => (
              <BookClubCard key={club.book_club_id} searchResult={club}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default BookClubSearching;
