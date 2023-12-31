"use client";
import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import styles from "@/app/search/Search.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

import BookSearchModal from "../components/BookSearchModal/BookSearchModal";



function MyForm(query: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [img,setImg] = useState('');

  //모달창 & 책 이미지가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  //책정보
  const [selectedBookInfo, setSelectedBookInfo] = useState<any>(null);
  const [bookData, setBookData] = useState([]);

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("searchTerm", searchTerm);
    router.push(`/search?query=${searchTerm}`);

    //router.replace와의 차이 : push를 하면 들어간 값이 페이지로 전환되고 히스토리에 남지만 replace는 안남는다.

    fetch(`/api?query=${searchTerm}`)
    //쿼리파라미터를 안썼는데 쿼리를 받아오라고 시켰음 그래서 쿼리가 안들어가서 계속 null 로 들어갔음.
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const bookData = data.items
        const images = data.items.map((item:any) => item.image);
        console.log('img',images)
        setImg(images);
        setBookData(data.items);
      });
  };

  

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    router.prefetch("/api");
  }, [router]);

  

  const openBookDetailModal = (index: number): void => {
    console.log('clicked')
    setSelectedBookInfo(bookData[index]); 
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  }

  const closeBookDetailModal = (): void => {
    setIsModalOpen(false);
    setSelectedImageIndex(-1);
  };


  return (
    <>
      <HomeHeader></HomeHeader>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.searchBox}>
            <form>
            <input type="text" onChange={handleChange} className={styles.input} placeholder="Search..."/>
            <div onClick={handleSubmit} className={styles.searchButton}><FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass}/></div>
            </form>
          </div>
        </div>
      </div>

         
        {img.length > 0 ? (
          <div className={styles.imgContainer} >
            {img.map((image, index) => (
             <img key={index} src={image} className={styles.img} onClick={() => openBookDetailModal(index)}/>
            ))}
          </div>
        ): <h2 className={styles.noData}>No data</h2>}


      {/* 모달 오픈  */}
      {isModalOpen && selectedImageIndex !== -1 && (
        <BookSearchModal img={img} 
        selectedImageIndex={selectedImageIndex} 
        setIsModalOpen={setIsModalOpen}
        selectedBookInfo={selectedBookInfo}
        />
      
      )}


    </>
  );
}

export default MyForm;
4
// // export default page
