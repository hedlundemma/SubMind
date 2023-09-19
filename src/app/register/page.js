"use client";
import { useState } from "react";
import { supabase } from "../../../supabase";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Main = styled.div`
  background-color: white;
  height: 850px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 32px;
  gap: 32px;
  color: black;
  height: 100vh;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 3px solid #ededed;
  }
  form input {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ededed;
    box-sizing: border-box;
    padding-left: 16px;
  }
  form button {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 0;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    height: 40px;
  }
  h1 {
    font-weight: 400;
  }
  h3 {
    font-size: 16;
    font-weight: 200;
    width: 100%;
    text-align: center;
  }
  h3 a {
    border-bottom: 1px solid black;
  }
`;
const Agreement = styled.div`
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Registration error:", error.message);
      } else {
        console.log("Registration successful:", data);
        router.push("/registerConfirmation");
      }
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <Main>
      <Navbar></Navbar>
      <Section>
        <h1>Registrera dig</h1>
        <form onSubmit={handleRegister}>
          <div>
            <input
              required
              placeholder="Email adress"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              placeholder="Lösenord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Agreement>
            <input required type="checkbox" />
            <h3>
              {" "}
              Jag godkänner <Link href="/userterms">Användarvillkoren</Link>
            </h3>
          </Agreement>
          <button type="submit">Skapa konto</button>
        </form>

        <h3>
          Har du redan ett konto? <Link href="/login">Logga in här</Link>
        </h3>
      </Section>
      <Footer></Footer>
    </Main>
  );
}
