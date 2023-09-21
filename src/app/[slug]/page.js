"use client"
import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SubscriptionCard from "@/components/subscriptionCard/SubscriptionCard";
import styled from "styled-components";




const Slug = (id) => {
  const [subscription, setSubscription] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  useEffect(() => {
    const setId = async () => {
      const data = id.params.slug;
      setSubscriptionId(data);
    };
    setId();
  }, [id]);
  useEffect(() => {
    const fetchSubscription = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data } = await supabase
        .from("Subscriptions")
        .select()
        .eq("id", id.params.slug);
      setSubscription(data);
    };
    fetchSubscription();
  }, [subscriptionId]);
  console.log(subscription)


  if(subscription != null)
  {
    return(
      <>
        <SubscriptionCard
          key={subscription.id}
          id={subscription.id}
          cost={subscription.monthly_cost}
          name={subscription.subscription}
        />
        </>
    )
  }
  else
  {
    return(
      <p>loading...</p>
    )
  }
};

  

export default Slug;
