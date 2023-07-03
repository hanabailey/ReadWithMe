import React from 'react'
import Modal from './UI/Modal'

function ModalForBorrowing(props:any) {

  return (
    <>
    <Modal setModalOpen={props.setModalOpen}>
      <h1>반납일정추가</h1>
    </Modal>
    </>
  )
}

export default ModalForBorrowing