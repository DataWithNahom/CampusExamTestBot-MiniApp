// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Expand the mini-app to full screen
tg.expand();

// Add a "Get Started" button
const getStartedButton = document.getElementById("get-started");
getStartedButton.addEventListener("click", () => {
    tg.sendData("User clicked Get Started");
    tg.close(); // Close the mini-app after sending data
});