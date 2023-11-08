'use client'

import { createContext, useContext, useState, useEffect  } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const BookClubUserContext = createContext<any>({
    bookClubUsers: []
})


export const BookClubUserContextProvider = ({children}) =>{
    const [bookClubUsers, setBookClubUsers]=useState([])


    const supabase = createClientComponentClient();
  
    useEffect(() => {
      const fetchBookClubUsers= async () => {

        const { data, error } = await supabase
          .from("book_club_users")
          .select("*,users(*)")
        //   .eq("book_club_id",bookClub_id);
      
  
        if (error) {
          setBookClubUsers(null);
          console.log(error);
        }
  
        if (data) {
          console.log("북클럽유저 데이터", data);
          setBookClubUsers(data);
        }
      };
  
      fetchBookClubUsers();
    }, []);


    return(
        <BookClubUserContext.Provider value={bookClubUsers}>
            {children}
        </BookClubUserContext.Provider>
    )
};

export const useGlobalContext =()=>useContext(BookClubUserContext);