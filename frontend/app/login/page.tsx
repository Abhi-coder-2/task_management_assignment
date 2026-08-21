"use client";

import axios from "axios";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setLocalStorage } from "../lib/LocalStorage";

interface GuestUser {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface GuestLoginResponse {
  message: string;
  user: GuestUser;
}

export default function GuestLogin() {
  const [guestData, setGuestData] =
    useState<GuestLoginResponse | null>(null);

  const router = useRouter();


  const handleClick = async () => {
    try {
      const res = await axios.post<GuestLoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/guest-login`
      );


      // Store complete response
      setGuestData(res.data);

      // Store user data in localStorage
      setLocalStorage("guestLogin", res.data.user);

      // Go to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Guest login failed:", error);
    }
  };

  return (
    <div
      className={`${styles.login_main} flex min-h-screen items-center justify-center flex-col gap-4 px-4`}
    >
      <div
        className={`${styles.login_body} text-center p-5`}
      >
        <p className="font-bold text-xl">
          Let's get back on track
        </p>

        <p className={`${styles.login_para}`}>
          Enter your email below to login to your account
        </p>

        <div className="mt-3">
          <button
            onClick={handleClick}
            className={`${styles.login_btn_guest} text-center`}
          >
            Continue as Guest
          </button>
        </div>

        <div>
          <button
            className={`${styles.login_btn_google} text-center`}
          >
            G Login with Google
          </button>
        </div>
      </div>

      <div
        className={`${styles.bottom_text} text-center text-xs`}
      >
        By clicking continue, you agree to <br />
        our{" "}
        <span className={`${styles.border_bottom}`}>
          Terms of Service
        </span>{" "}
        and{" "}
        <span className={`${styles.border_bottom}`}>
          Privacy <br />
          <span>Policy</span>
        </span>
      </div>
    </div>
  );
}