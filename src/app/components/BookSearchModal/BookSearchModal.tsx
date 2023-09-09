import React from "react";
import styles from "@/app/components/BookSearchModal/BookSearchModal.module.scss";
import Modal from "../UI/Modal";
import { Select, ScrollArea} from "@mantine/core";

interface BookSearchModalProps {
  img: string[];
  selectedImageIndex: number;
  setIsModalOpen: any;
  selectedBookInfo: any;
}

function BookSearchModal(props: BookSearchModalProps) {
  const { img, selectedImageIndex, setIsModalOpen, selectedBookInfo } = props;

  const closeBookDetailModal = (): void => {
    setIsModalOpen();
  };

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
              className={styles.select}
              label="독서상태"
              placeholder="Pick one"
              data={[
                { value: "읽고싶은", label: "읽고싶은" },
                { value: "읽는 중", label: "읽는 중" },
                { value: "읽음", label: "읽음" },
                { value: "잠시멈춘", label: "잠시멈춘" },
                { value: "중단", label: "중단" },
              ]}
            />

            <button className={styles.Button}>Add to My Library</button>
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
