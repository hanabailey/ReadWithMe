import React from "react";
import styles from '@/app/components/UI/SearchBar.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.searchBox}>
            <input type="text" className={styles.input} placeholder="Search..."/>
            <div className={styles.searchButton}><FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}/></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
