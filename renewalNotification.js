import { supabase } from "./supabase";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  try {
    const { data: subscriptions, error } = await supabase
      .from("Subscriptions")
      .select("*")
      .lt("renewal_date", new Date()); // Adjust the condition as needed

    if (error) {
      throw error;
    }

    // Calculate days until renewal and send notifications as needed
    for (const subscription of subscriptions) {
      const currentDate = new Date();
      const renewalDate = new Date(subscription.renewal_date); // Assuming 'renewal_date' is a date field in your database

      const timeDifferenceMs = renewalDate - currentDate;

      // Calculate days until renewal
      const daysUntilRenewal = Math.ceil(
        timeDifferenceMs / (1000 * 60 * 60 * 24)
      );

      if (daysUntilRenewal >= 1 && daysUntilRenewal <= 4) {
        sendNotificationToUser(
          subscription.userId,
          `Your subscription is due for renewal in ${daysUntilRenewal} days.`
        );
      }
    }
  } catch (error) {
    console.error("Error in renewal notification task:", error);
  }
});

// Implement the sendNotificationToUser function to send notifications to the user
async function sendNotificationToUser(userId, message) {
  try {
    // You can use your preferred method to send notifications to the user
    // This might involve using the Notification API, a push notification service (e.g., Firebase Cloud Messaging), or an email service.
    // For simplicity, we'll assume you're using the Notification API here.

    // Check if the user has granted notification permission
    if (Notification.permission === "granted") {
      // Create and display a notification
      const notification = new Notification("Subscription Renewal Reminder", {
        body: message,
      });
    } else {
      // Handle the case where the user has not granted permission (e.g., prompt the user to enable notifications).
    }
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}
