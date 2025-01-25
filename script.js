// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Expand the mini-app to full screen
tg.expand();

// Function to load an exam
function loadExam(examId) {
    // Use the raw GitHub URL to fetch the exam HTML
    const rawUrl = `https://raw.githubusercontent.com/DataWithNahom/CampusExamTestBot-MiniApp/main/exams/${examId}.html`;
    
    fetch(rawUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load exam");
            }
            return response.text();
        })
        .then(html => {
            // Display the exam in the exam container
            document.getElementById("exam-container").innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading exam:", error);
            document.getElementById("exam-container").innerHTML = "<p>Error loading exam. Please try again.</p>";
        });
}

// Add event listener to the "Get Started" button
const getStartedButton = document.getElementById("get-started");
if (getStartedButton) {
    getStartedButton.addEventListener("click", () => {
        tg.sendData("User clicked Get Started");
        tg.close(); // Close the mini-app after sending data
    });
}