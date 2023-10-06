'use client'

import { createContext, useContext, useState, useEffect  } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import BookClub from "../bookClub/page";

export const BookClubContext = createContext<any>({
    bookClub : []
})


export const BookClubContextProvider = ({children}) =>{
    const [bookClub, setBookClub]=useState([])


    const supabase = createClientComponentClient();
  
    useEffect(() => {
      const fetchBooks = async () => {
  
        const {
              data: { user },
            } = await supabase.auth.getUser();
      
        const { data, error } = await supabase
          .from("book_club_users")
          .select("*, book_clubs(*)")
          .eq("user_id", user.id);
      
  
        if (error) {
          setBookClub(null);
          console.log(error);
        }
  
        if (data) {
          console.log("북클럽 데이터", data);
          setBookClub(data);
        }
      };
  
      fetchBooks();
    }, []);


    return(
        <BookClubContext.Provider value={bookClub}>
            {children}
        </BookClubContext.Provider>
    )
};

export const useGlobalContext =()=>useContext(BookClubContext);