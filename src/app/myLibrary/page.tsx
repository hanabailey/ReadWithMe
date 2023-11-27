'use client'
import React,{useState,useEffect} from 'react'
import styles from '@/app/myLibrary/myLibrary.module.scss'
import HomeHeader from '../components/HomeHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {faCircleUser,faRectangleList,faClipboard,faChartColumn} from "@fortawesome/free-solid-svg-icons";
import Timeline from "@/app/components/MyLibrary//Timeline";
import MyBookList from '../components/MyLibrary/MyBookList'
import Statistics from '../components/MyLibrary/Statistics'

function Page() {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState<any>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchBooks = async () => {

      const {
            data: { user },
          } = await supabase.auth.getUser();
    
      const { data, error } = await supabase
        .from("user_books")
        .select("*, books(*)")
        .eq("user_id", user.id);
    

      if (error) {
        setFetchError("Could not find data");
        setBooks(null);
        console.log(error);
      }

      if (data) {
        console.log("데이터있음 라이브러리", data);
        setBooks(data);
        setFetchError(null);
      }
    };

    fetchBooks();
  }, []);

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

        <div className={styles.detailContainer}>
          <h2 className={styles.title}>My Book List</h2>
          {books &&<MyBookList bookList={books}></MyBookList>}
          <h2 className={styles.title}>Timeline</h2>
          {books && <Timeline detail={books}></Timeline>}
          <h2 className={styles.title}>Reading statistics</h2>
          {books &&<Statistics books={books}/>}
        </div>
      </div>
    </>
  )
}

export default Page