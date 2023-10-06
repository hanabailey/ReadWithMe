"use client";
import React, { useState } from "react";
import { Card, Image, Text } from "@mantine/core";
import styles from "@/app/components/BookClub/BookClubCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { BookClubContext, useGlobalContext } from "@/app/context/bookClubData";
import BookClub from "@/app/bookClub/page";

const BookClubCard = (props) => {
  const [liked, setLiked] = useState(false);
  // const bookClub = useGlobalContext();

  console.log(props.searchResult)

  // console.log(props.bookClub);
  // if (!props.bookClub) return null;


  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
      <Card
        shadow="sm"
        padding={0}
        component="a"
        target="_blank"
        className={styles.bookClubCard}
      >
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            height={160}
            alt="No way!"
          />
          <button className={styles.likeButton} onClick={handleLikeClick}>
            {liked ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <img src="/heart-regular.svg" />
            )}
          </button>
        </Card.Section>

        <Text weight={500} size="lg" mt="md" className={styles.bookClubName}>
          {props.searchResult.name}
        </Text>
        <Text
          mt="xs"
          color="dimmed"
          size="sm"
          className={styles.bookClubIntroDuction}
        >
          {props.searchResult.introduction}
        </Text>

        {/* 북클럽키워드5개까지 넣을 수 있음  */}
        {props.searchResult.keywords &&
          props.searchResult.keywords
            .slice(0, 5)
            .map((keyword, index) => (
              <div key={index} className={styles.keyword}>
                #{keyword}
              </div>
            ))}
      </Card>
    </>
  );
};

export default BookClubCard;
