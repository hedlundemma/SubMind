self.addEventListener("push", function (event) {
  const options = {
    body: event.data.text(),
    icon: "/path/to/192x192.png", // Replace with your own icon path
  };

  event.waitUntil(
    self.registration.showNotification("Subscription Renewal Reminder", options)
  );
});
