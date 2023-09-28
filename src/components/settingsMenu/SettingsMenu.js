" use client";
import { useEffect, React } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../../supabase";
import { useRouter } from "next/navigation";

const MenuContainer = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  padding: 10px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const Section = styled.div`
  padding: 20px;
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
    color: black;
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
    margin-top: 12px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 300;
  color: black;
  margin-bottom: 24px;
  margin-top: 24px;
`;

const DeleteAccountButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 8px 0;
  color: black;
  text-align: center;
  border-radius: 6px;
  height: 40px;
  background-color: white;
  border: 1px solid red;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 24px;
`;

const CrossButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LogoutButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  padding: 8px 0;
  color: black;
  text-align: center;
  border-radius: 6px;
  height: 40px;
  background-color: white;
  border: 1px solid black;
  border-radius: 16px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 400;
`;

const SettingsMenu = ({ isOpen, toggleMenu }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  //function to change the account info, email and password (doesnt work)
  const changeAccountInfo = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.update({
        email,
        password,
      });

      if (error) {
        console.error("Error updating email:", error.message);
      } else {
        console.log("Email updated successfully");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  //delete your account (doesnt work right now)
  const deleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmation) {
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();
      const { } = await supabase.auth.signOut();
      // const test = supabase.auth.getSession();
      // const adminToken = (await test).data.session.access_token
      // // Delete the user account
      // const { data, error } = await supabase.auth.admin.deleteUser(
      //   user.id, { headers: { Authorization: `Bearer ${adminToken}` } }
      // )

      router.push("/login");
      try {
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

  // function to close the menu by calling the toggleMenu function
  const closeMenu = () => {
    toggleMenu();
  };

  return (
    <MenuContainer $isOpen={isOpen}>
      <Section>
        <SettingsContainer>
          <Heading> Inställningar</Heading>
          <CrossButton onClick={closeMenu}>
            <img src="/logo/cross.svg" alt="a cross icon" />
          </CrossButton>
        </SettingsContainer>
        <Container>
          <p>Dark Mode</p>
        </Container>
        <Heading> Ditt konto</Heading>
        <form onSubmit={changeAccountInfo}>
          <div>
            <label>Ändra email</label>
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
            <label>Ändra Lösenord</label>
            <input
              required
              placeholder="Lösenord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Spara kontouppgifter</button>
        </form>
        <div>
          <LogoutButton onClick={handleLogout}>Logga ut</LogoutButton>
        </div>

        <DeleteAccountButton onClick={deleteAccount}>
          Ta bort kontot
        </DeleteAccountButton>

        <p>
          Notera: Din prenumeration är fortfarande aktiv på tjänsten även om du
          tar bort den i den här appen!
        </p>
      </Section>
    </MenuContainer>
  );
};

export default SettingsMenu;
