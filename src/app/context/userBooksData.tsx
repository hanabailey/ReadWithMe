'use client'

import { createContext, useContext, useState, useEffect  } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const BookDetailContext = createContext<any>({
    bookDetail: []
})


export const UserBookDetailContextProvider = ({children}) =>{
    const [userBookDetail, setUserBookDetail]=useState([])
    const supabase = createClientComponentClient();

    useEffect(() => {
        const fetchInitialRecommendation = async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();
    
          try {
            const { data, error } = await supabase
              .from("user_books")
              .select()
            //   .eq("isbn", bookIsbn)
              .eq("user_id", user.id);
    
            if (error) {
              console.error("Error fetching recommendation:", error);
              setUserBookDetail(data)
            } 

          } catch (error) {
            console.error("Error fetching recommendation:", error);
          }
        };
    
        fetchInitialRecommendation();
      }, []);
    

    return(
        <BookDetailContext.Provider value={userBookDetail}>
            {children}
        </BookDetailContext.Provider>
    )
};

export const useGlobalContext =()=>useContext(BookDetailContext);