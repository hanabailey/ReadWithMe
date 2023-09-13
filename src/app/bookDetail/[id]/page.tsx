"use client"
import React,{useState, useEffect} from "react";
import HomeHeader from "@/app/components/HomeHeader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


function BookDetail(props) {
    const [fetchError, setFetchError] = useState(null);
    const [books, setBooks] = useState<any>(null);
    const supabase = createClientComponentClient();
    const id = props.params.id; 
  
    useEffect(()=>{
      const fetchBooks =async () => {
        const { data, error } = await supabase
        .from("books")
        .select(`*, user_books(*)`)
        .eq("isbn",id) //id값이랑 맞는애만 불러와
        console.log(props.params.id) 
     

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
      <h1>Individual book detail</h1>
      <h1> {books && (
        <div>
          <h2>{books.title}</h2>
          <p>{books.author}</p>
        </div>
      )}</h1>
    </>
  );
}

export default BookDetail;
