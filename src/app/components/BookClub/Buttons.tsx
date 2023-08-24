"use client";

import React, { Component, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/components/BookClub/Buttons.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faMagnifyingGlass,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../UI/Modal";

// create book club form
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { Textarea, NumberInput } from "@mantine/core";

const Buttons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createNewClubHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //멘타인 create clubs form
  const [submittedValues, setSubmittedValues] = useState("");

  const form = useForm({
    initialValues: {
      bookClubName: "best club in town",
      numberOfPeople: 5,
      keyWords: "economics",
      introduction: "",
    },

    transformValues: (values: any) => ({
      BookCLubNameme: `${values.bookClubName}`,
      numberOfPeople: Number(values.numberOfPeople) || 0,
      keyWords: `${values.keyWords}`,
      Introduction: `${values.introduction}`,
    }),
  });

  // Browsing book clubs page 전환
  const router = useRouter();
  const browsingClubsHandler = () => {
    router.push("/bookclub/bookClubSearchPage");
  };
  return (
    <>
      <div className={styles.iconsContainer}>
        <div className={styles.buttonContainers}>
          <div className={styles.iconButton} onClick={createNewClubHandler}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </div>
          <label className={styles.iconTitle}>Create New Club</label>
        </div>
        <div className={styles.buttonContainers}>
          <div className={styles.iconButton}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={() => router.push("/bookClub/bookClubSearchPage")}
            />
          </div>
          <label className={styles.iconTitle}>Browsing Clubs</label>
        </div>
        <div className={styles.buttonContainers}>
          <div className={styles.iconButton}>
            <FontAwesomeIcon icon={faUsersLine} />
          </div>
          <label className={styles.iconTitle}>My Book Clubs</label>
        </div>
      </div>

      {/* 북클럽만들기 모달 오픈 */}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={closeModal}>
          <h2 className={styles.createClubTitle}>Create New book club</h2>
          <Box maw={400} mx="auto">
            <form
              onSubmit={form.onSubmit((values) =>
                console.log(values)
              )}
            >
              <TextInput
                withAsterisk
                label="Book Club Name"
                placeholder="Book Club Name"
                {...form.getInputProps("bookClubName")}
              />
              <TextInput
                withAsterisk
                label="Keywords"
                placeholder="Keywords"
                mt="md"
                {...form.getInputProps("keyWords")}
                />
                <div>#keyword</div>
                <div>#keyword</div>
                <div>#keyword</div>
     
              <NumberInput
                withAsterisk
                defaultValue={5}
                max={15}
                min={1}
                placeholder="How many?(max 15)"
                label="The number of people in club"
                {...form.getInputProps("numberOfPeople")}
              />
              
              <Textarea
                placeholder="write club introduction down"
                label="Introduction"
                description="Let's introduce our new book club !"
                // error="Try to say something to everybody!"
                radius="md"
              />

              <button className={styles.createBookclubButton}>
                Create book club
              </button>
            </form>

            {submittedValues && <Code block>{submittedValues}</Code>}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Buttons;
