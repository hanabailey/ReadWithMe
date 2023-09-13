"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import styles from "./login.module.scss";
import bookIcon from "../../../public/img/Vector.png";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (data.user) {
      router.replace("/home");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.icon}>
          <Image src={bookIcon} alt="My Image" width={30} height={30} />
        </div>
        <div className={styles.title}>Read With Me</div>

        {/* 로그인 틀 */}
        <div className={styles.loginFrame}>
          <h1 className={styles.loginTitle}>Sign In</h1>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="ID"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="loginButton" onClick={login}>
              LOG IN
            </button>
          </div>
          
        <div className={styles.divisionSmallLine}><span>OR</span></div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
