import React from 'react'
import styles from '@/app/myLibrary/myLibrary.module.scss'
import HomeHeader from '../components/HomeHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleUser,faRectangleList,faClipboard,faChartColumn} from "@fortawesome/free-solid-svg-icons";

function page() {
  return (
    <>
      <HomeHeader/>

      <div className={styles.Container}>
        <div className={styles.userContainer}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
            <h2>Good Morning, Hana</h2>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.icon}><FontAwesomeIcon icon={faRectangleList} />Book List</div>    
          <div className={styles.icon}><FontAwesomeIcon icon={faClipboard} />My Note</div>    
          <div className={styles.icon}><FontAwesomeIcon icon={faChartColumn} />My 통계</div>    
        </div>
      </div>
    </>
  )
}

export default page