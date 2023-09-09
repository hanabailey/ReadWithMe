import React from "react";
import Modal from "@/app/components/UI/Modal";

function BookCardModal(props: any) {
  const { setIsModalOpen,modalClose } = props;



  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <p>서재에서 책 찾아서 넣을 수 있음</p>
    
    </Modal>
  );
}

export default BookCardModal;
