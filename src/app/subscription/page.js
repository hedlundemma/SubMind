"use client";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import Footer from "@/components/footer/footer";
import { supabase } from "../../../supabase";
import styled from "styled-components";
import StreamingForm from "@/components/streamingForm/StreamingForm";

const Main = styled.div`
  background-color: white;
  height: 830px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 525px;
  padding: 24px;
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-top: 52px;
  padding-bottom: 24px;
`;

function Subscription() {
  return (
    <Main>
      <UserNavbar></UserNavbar>
      <Section>
        <Heading>Lägg till prenumeration</Heading>
        <StreamingForm></StreamingForm>
      </Section>
      <Footer></Footer>
    </Main>
  );
}

export default Subscription;
