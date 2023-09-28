"use client";
import Footer from "@/components/footer/footer";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import styled from "styled-components";
import SubscriptionButton from "@/components/subscriptionButton/SubscriptionButton";
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
// import Notifications from "@/components/notifications/notifications";

const Main = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  button {
    margin-bottom: 100px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  h2 {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
  }
  img {
    margin-top: 48px;
    margin-bottom: 48px;
  }
`;

const Notifications = dynamic(
  () => import("@/components/notifications/Notifications"),
  {
    ssr: false, // Make sure to render component client side to access window and Notification APIs
  }
);

export default function Start() {
  const router = useRouter();
  const [user, setUser] = useState("");

  useEffect(() => {
    const checkUserSession = async () => {
      const session = supabase.auth.getSession();
      if (session) {
        if ((await session).data.session == null) {
          router.push("/login");
        }
      }
    };
    checkUserSession();
  }, [router]);

  return (
    <Main>
      <UserNavbar></UserNavbar>
      <Notifications />
      <Section>
        <h2>Lägg till en prenumeration för att komma igång!</h2>
      </Section>
      <SubscriptionButton
        href="/subscription"
        text="Lägg till prenumation"
      ></SubscriptionButton>

      <Footer></Footer>
    </Main>
  );
}
