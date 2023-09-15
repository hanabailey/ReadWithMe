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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const [formError, setFormError] = useState(null);
  const supabase = createClientComponentClient();

  const form = useForm({
    initialValues: {
      bookClubName: "best club in town",
      numberOfPeople: 5,
      keyWords: "economics",
      introduction: "",
    },

    transformValues: (values: any) => ({
      name: values.bookClubName,
      numberOfMembers: +values.numberOfMembers || 0,
      keyWords: values.keyWords.split(",").map(x => x.trim()).filter(Boolean),
      Introduction: values.introduction,
    }),
  });

  const formSubmitHandler = async (values: any) => {
    const { data, error } = await supabase.from("book_clubs").insert({
      name: values.name,
      keywords: values.keyWords,
      number_of_members: values.numberOfMembers,
      introduction: values.Introduction,
    });

    if (error) {
      setFormError("Error inserting data");
    } else {
      console.log("Data inserted successfully", data);
     
    }
  };

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
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <h2 className={styles.createClubTitle}>Create New book club</h2>
          <Box maw={400} mx="auto">
            <form
              // onSubmit={form.onSubmit((values) =>
              //   console.log(values)
              // )}
              onSubmit={form.onSubmit((values) => formSubmitHandler(values))}
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

              <button className={styles.createBookclubButton} type="submit">
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
