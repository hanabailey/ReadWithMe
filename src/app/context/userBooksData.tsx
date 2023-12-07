"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const userBooksDetailContext = createContext([]);

export const UserBooksDetailContextProvider = ({ children }) => {
  const [userBookDetail, setUserBookDetail] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserBookTable = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("user_books")
        .select("*, books(*)")
        .eq("user_id", user.id);

      console.log(data, "컨텍스트");
      if (error) {
        console.error("Error fetching", error);
      }
      if (data) {
        setUserBookDetail(data);
      }
    };

    fetchUserBookTable();
  }, [supabase]);

  return (
    <userBooksDetailContext.Provider value={userBookDetail}>
      {children}
    </userBooksDetailContext.Provider>
  );
};

export const useGlobalContext = () => useContext(userBooksDetailContext);
