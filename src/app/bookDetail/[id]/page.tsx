"use client"
import React,{useState, useEffect} from "react";
import styles from '@/app/bookDetail/[id]/bookDetail.module.scss'
import HomeHeader from "@/app/components/HomeHeader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DivisionLine from "@/app/components/UI/DivisionLine";


function BookDetail(props) {
    const [fetchError, setFetchError] = useState(null);
    const [books, setBooks] = useState<any>(null);
    const supabase = createClientComponentClient();
    const book_isbn = props.params.id; 
  
    useEffect(()=>{
      const fetchBooks =async () => {
        const { data, error } = await supabase
        .from("books")
        .select(`*, user_books(*)`)
        .eq("isbn",book_isbn) //id값이랑 맞는애만 불러와
        console.log("책 isbn",book_isbn) 
     

        if(error){
          setFetchError('Could not find data')
          setBooks(null)
          console.log(error)
        }
  
        if(data){
          console.log('데이터있음',data)
          setBooks(data[0])
          setFetchError(null)
        }
      }
      
      fetchBooks()
  
    },[])
  
  
  
  return (
    <>
      <HomeHeader />
    
    <h1 className={styles.title}>Book Detail</h1>
      {books && (
        <>
        <div className={styles.container}>
        <div className={styles.bookDetailContainer}>
          <h1 className={styles.bookTitle}>{books.title}</h1>
          <h2 className={styles.authorTitle}>{books.author}</h2>
          <p className={styles.publisherTitle}>{books.publisher}</p>
        </div>
          <img src={books.img} className={styles.bookImg}></img>
          </div>
          <DivisionLine/>
          <p>{books.user_books[0].reading_status}</p>
          <p>{books.user_books[0].is_recommend}</p>
          <p>{books.user_books[0].star_review}</p>
          </>
      )}
    </>
  );
}

export default BookDetail;
