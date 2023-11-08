import React, { useState, useEffect } from "react";
import { Rating } from "@mantine/core";
import styles from "@/app/bookDetail/[id]/bookDetail.module.scss"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const StarReview = ({ bookIsbn }) => {
    const supabase = createClientComponentClient();
    const [value, setValue] = useState(0); 

    useEffect(() => {
        async function fetchStarReview() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            try {
                const { data, error } = await supabase
                    .from("user_books")
                    .select('star_review')
                    .eq("isbn", bookIsbn)
                    .eq('user_id', user.id);

                if (error) {
                    console.error("Error fetching star review:", error);
                } else {
                    const status = data[0]?.star_review;
                    setValue(status);
                }
            } catch (error) {
                console.error("Error fetching star review:", error);
            }
        }

        fetchStarReview();
    }, [bookIsbn]);

    const statusChangeHandler = async (newValue) => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        try {
            const { data, error } = await supabase
                .from("user_books")
                .update({ star_review: newValue })
                .eq("isbn", bookIsbn)
                .eq('user_id', user.id)
                .select();

            if (error) {
                console.error("Star review update error:", error);
            } else {
                console.log("Star review updated successfully:", data);
                setValue(newValue);
            }
        } catch (error) {
            console.error("Error updating star review:", error);
        }
    };

    return (
        <>
            <h3 className={styles.infoSubHeader}>Rating</h3>
            <div className={styles.ratingContainer}>
                <Rating value={value} onChange={statusChangeHandler} />
                <button onClick={() => statusChangeHandler(0)} className={styles.enterButton}>
                    reset
                </button>
            </div>
        </>
    );
};

export default StarReview;
