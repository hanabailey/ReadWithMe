"use client";
import React, { useState, useEffect, useContext } from "react";
import { Card, Image, Text } from "@mantine/core";
import styles from "@/app/components/BookClub/BookClubCard.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Modal from "../UI/Modal";
import { Avatar } from "@mantine/core";
import {
  BookClubUserContext,
  useGlobalContext,
} from "@/app/context/bookClubUserData";

const BookClubCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = createClientComponentClient();
  const bookClubUsers = useContext(BookClubUserContext);

  console.log(bookClubUsers, "클럽유저");
  console.log(props.searchResult, "search result");

  //현재 북클럽에 들어있는 유저들 필터링
  const currentBookClubId = props.searchResult.book_club_id;
  const membersInCurrentClub = bookClubUsers.filter(
    (user) => user.book_club_id === currentBookClubId
  );
  console.log("현재 이 클럽 멤버들", membersInCurrentClub);

  //리더 체크
  const leaderUser = membersInCurrentClub.find(
    (user) => user.user_id === props.searchResult.leader_user_id
  );

  console.log(leaderUser);

  const leaderUserName = leaderUser ? leaderUser.users.name : "Unknown";
  const leaderImage = leaderUser?.users.profile_img;
  console.log(leaderImage);


  // 멤버수계산하기
  const maxMembers = props.searchResult.number_of_members;
  const currentMembers = membersInCurrentClub.length;
  const remainingMembers = maxMembers - currentMembers;

 //가입가능한 인원체크
  const isJoinable = remainingMembers > 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        shadow="sm"
        padding={0}
        className={styles.bookClubCard}
        onClick={openModal}
      >
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            height={160}
            alt="No way!"
          />
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
          props.searchResult.keywords.slice(0, 5).map((keyword, index) => (
            <div key={index} className={styles.keyword}>
              #{keyword}
            </div>
          ))}

        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen}>
            <h2 className={styles.bookClubTitle}>{props.searchResult.name}</h2>
            <Image
              src={props.searchResult.club_img}
              width={600}
              height={160}
              alt="img"
            />
            <div className={styles.bookClubContainer}>
              <div className={styles.IntroContainer}>
                <div>
                  <h4 className={styles.smallTitle}>Leader</h4>
                  <div className={styles.leaderContainer}>
                    <Avatar src={leaderImage} radius="xl" />
                    <span className={styles.leaderId}>{leaderUserName}</span>
                  </div>
                  <h4 className={styles.smallTitle}>Members</h4>
                  <div className={styles.membersContainer}>
                    <p>
                      Current memebers :{currentMembers} / Current available capacity : {maxMembers} ({remainingMembers} spot left)
                    </p>{" "}
                    <Avatar.Group>
                      {membersInCurrentClub.map((member, index) => (
                        <Avatar
                          key={index}
                          src={member.users.profile_img}
                          radius="xl"
                        />
                      ))}
                      <Avatar radius="xl">
                        +
                        {props.searchResult.number_of_members -
                          membersInCurrentClub.length}
                      </Avatar>
                    </Avatar.Group>
                  </div>
                </div>
              </div>
              <h4 className={styles.smallTitle}>Keywords</h4>
              <div className={styles.keywordContainer}>
                {props.searchResult.keywords &&
                  props.searchResult.keywords.map((keyword, index) => (
                    <div key={index} className={styles.cardKeyword}>
                      #{keyword}
                    </div>
                  ))}
              </div>
              <h4 className={styles.smallTitle}>Introduction</h4>
              <p>{props.searchResult.introduction}</p>
              <button className={styles.joinButton}>JOIN</button>
             
            </div>
          </Modal>
        )}
      </Card>
    </>
  );
};

export default BookClubCard;
