self.addEventListener("push", function (event) {
  const options = {
    body: event.data.text(),
    icon: "/logo/icon.png",
  };

  event.waitUntil(
    self.registration.showNotification("Subscription Renewal Reminder", options)
  );
});
