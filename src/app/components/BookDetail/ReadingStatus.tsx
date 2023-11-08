import React, { useState,useEffect } from 'react'
import { Select } from "@mantine/core";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const ReadingStatus = ( { selectedStatus, bookIsbn }) => {
    const [readingStatus, setReadingStatus] = useState('')
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function fetchReadingStatus() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            try {
                const { data, error } = await supabase
                    .from("user_books")
                    .select('reading_status')
                    .eq("isbn", bookIsbn)
                    .eq('user_id', user.id);

                if (error) {
                    console.error("Error fetching reading status:", error);
                } else {
                    const status = data[0]?.reading_status || selectedStatus;
                    setReadingStatus(status);
                }
            } catch (error) {
                console.error("Error fetching reading status:", error);
            }
        }

        fetchReadingStatus();
    }, [bookIsbn, selectedStatus]);
    

    const statusChangeHandler = async (newValue) => {
        const {
            data: { user },
          } = await supabase.auth.getUser();
    

        try {
            const { data, error } = await supabase
                .from("user_books")
                .update({reading_status: newValue })
                .eq("isbn", bookIsbn)
                .eq('user_id',user.id)
                .select();
              

            if (error) {
                console.error("Reading status update error:", error);
            } else {
                console.log("Reading status updated successfully:", data);
                setReadingStatus(newValue);
            }
        } catch (error) {
            console.error("Error updating reading status:", error);
        }
    };


    return (
        <>
        <Select
            label="Reading status"
            placeholder="Pick one"
            onChange={statusChangeHandler}
            value={readingStatus}
            data={[
                { value: "want to read", label: "want to read" },
                { value: "reading", label: "reading" },
                { value: "done", label: "done" },
                { value: "pause", label: "pause" },
                { value: "stop", label: "stop" },
            ]}
        />
        {/* <p>Current reading status : {readingStatus}</p> */}
        </>
    );
}

export default ReadingStatus;
