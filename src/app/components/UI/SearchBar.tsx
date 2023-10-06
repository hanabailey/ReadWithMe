import React, { useState } from "react";
import styles from "@/app/components/UI/SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    console.log('clicked')
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.searchButton} onClick={handleSearch}>
            <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
