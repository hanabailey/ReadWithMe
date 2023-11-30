import React, { useState } from "react";
import styles from "@/app/components/BookSearchModal/BookSearchModal.module.scss";
import Modal from "../UI/Modal";
import { Select, ScrollArea } from "@mantine/core";
import { NativeSelect } from '@mantine/core';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ReadingStatus from "../BookDetail/ReadingStatus";

interface BookSearchModalProps {
  img: string[];
  selectedImageIndex: number;
  setIsModalOpen: any;
  selectedBookInfo: any;
}

function BookSearchModal(props: BookSearchModalProps) {
  const { img, selectedImageIndex, setIsModalOpen, selectedBookInfo } = props;
  const supabase = createClientComponentClient();
  const [readingStatus, setReadingStatus] = useState("");

  console.log(selectedBookInfo);

  const closeBookDetailModal = (): void => {
    setIsModalOpen();
  };

  const addBookToLibraryHandler = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("books").insert([
      {
        isbn: selectedBookInfo.isbn,
        author: selectedBookInfo.author,
        title: selectedBookInfo.title,
        img: selectedBookInfo.image,
        link: selectedBookInfo.link,
        publisher: selectedBookInfo.publisher,
      },
    ]);

    if (error) {
      console.error("Error updating book:", error);
    } else {
      console.log("Book updated successfully:", data);
      // Close the modal or perform any other actions after successful update
      closeBookDetailModal();
    }


  };

  const readingStatusHandler =async (selectedOption)=>{
  
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error} = await supabase.from("user_books").upsert({reading_status: selectedOption,
      user_id:user.id,
      isbn:selectedBookInfo.isbn
     })
     console.log(user.id)
   
    
      if (error) {
        console.error("Reading status update error:", error);
    } else {
        console.log("Reading status updated successfully:", data);
        setReadingStatus(selectedOption);
    }
  }

  return (
    <Modal
      imageUrl={img[selectedImageIndex]}
      setIsModalOpen={closeBookDetailModal}
    >
      <div className={styles.modalContent}>
        {img[selectedImageIndex] && (
          <img src={img[selectedImageIndex]} className={styles.img} />
        )}
        {selectedBookInfo && (
          <div className={styles.content}>
            <h2 className={styles.bookTitle}>{selectedBookInfo.title}</h2>
            <h3>{selectedBookInfo.author}</h3>
            <ScrollArea h={250} scrollHideDelay={500}>
              <p className={styles.bookDescription}>
                {selectedBookInfo.description}
              </p>
            </ScrollArea>

            <Select
              value={readingStatus}
              className={styles.select}
              label="Reading status"
              placeholder="Pick one"
              onChange={readingStatusHandler}
              data={[
                { value: "Want to read", label: "Want to read" },
                { value: "Reading", label: "Reading" },
                { value: "Done", label: "Done" },
                { value: "pause", label: "pause" },
                { value: "stop", label: "stop" },
              ]}
            />

            <button className={styles.Button} onClick={addBookToLibraryHandler}>
              Add to My Library
            </button>
            <button onClick={closeBookDetailModal} className={styles.Button}>
              Close
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BookSearchModal;
