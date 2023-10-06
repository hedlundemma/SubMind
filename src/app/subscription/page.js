"use client";
import UserNavbar from "@/components/userNavbar/UserNavbar";
import Footer from "@/components/footer/footer";
import { supabase } from "../../../supabase";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import CompanySearch from "@/components/companySearch/companySearch";

const Main = styled.div`
  background-color: white;
  height: 830px;
`;

const CrossButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 525px;
  padding: 24px;

  align-items: flex-start;
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
    color: #818898;
    padding: 10px;
  }
  form button {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 0;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 5px;
    height: 40px;
    font-family: "K2D";
    margin-top: 24px;
    font-size: 18px;
  }

  label {
    font-size: 14;
    font-weight: 200;
    width: 100%;
  }

  select {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ededed;
    box-sizing: border-box;
    color: #818898;
    padding: 10px;
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  font-family: "K2D";
`;

const ChooseSection = styled.section`
  display: flex;
  flex-direction: row;
`;

const PrenumationSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 24px;
`;

const StreamingForm = () => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cost, setCost] = useState("");
  const [renewalFrequency, setRenewalFrequency] = useState("monthly");

  //function to calculate renewaldate of subscriptions, yearly or monthly
  const calculateRenewalDate = (startDate, renewalFrequency) => {
    const currentDate = new Date();
    const renewalDate = new Date(startDate);

    if (renewalFrequency === "monthly") {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else if (renewalFrequency === "yearly") {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    const timeDifference = renewalDate - currentDate;

    // Calculate the number of days left until renewal
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft;
  };

  const handleButtonClick = () => {
    router.push("/overview");
  };

  // array containing the options for renewal-frequenxy
  const renewalFrequencyOptions = [
    { value: "monthly", label: "Månadsvis" },
    { value: "yearly", label: "Årligen" },
  ];

  //making sure the user is logged in, otherwise redirect to login-page
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  //when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const renewalDate = calculateRenewalDate(startDate, renewalFrequency);

    const dataToInsert = {
      subscription: selectedService,
      start_date: startDate,
      renew_date: renewalDate,
      user_uuid: user.id,
    };

    //choose what table in the database to insert into, based on the choosen value
    if (renewalFrequency === "monthly") {
      dataToInsert.monthly_cost = cost;
    } else if (renewalFrequency === "yearly") {
      dataToInsert.yearly_cost = cost;
    }

    const { error } = await supabase
      .from("Subscriptions")
      .insert([dataToInsert]);
  };
  return (
    <Main>
      <UserNavbar></UserNavbar>
      <Section>
        <PrenumationSection>
          <Heading>Lägg till prenumeration</Heading>
          <Link href="/overview">
            <CrossButton>
              <img src="/logo/cross.svg" alt="a cross icon" />
            </CrossButton>
          </Link>
        </PrenumationSection>
        <CompanySearch setService={setSelectedService}></CompanySearch>
        <form onSubmit={handleSubmit}>
          <label>
            Datum
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </label>
          <ChooseSection>
            <label>
              Kostnad
              <input
                type="text"
                placeholder="Lägg till en kostnad"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </label>

            <label>
              Förnyas
              <select
                value={renewalFrequency}
                onChange={(e) => setRenewalFrequency(e.target.value)}
              >
                {/* displaying the values from the array */}
                {renewalFrequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </ChooseSection>

          <button onClick={handleButtonClick}>Lägg till prenumeration</button>
        </form>
      </Section>
      <Footer></Footer>
    </Main>
  );
};

export default StreamingForm;
