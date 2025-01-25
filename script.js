// Initialize Telegram Web App
const tg = window.Telegram.WebApp;

// Expand the mini-app to full screen
tg.expand();

// Function to load the list of exams
function loadExams() {
    fetch('/CampusExamTestBot-MiniApp/exams.json')
        .then(response => response.json())
        .then(exams => {
            const examList = document.getElementById("exam-list");
            examList.innerHTML = ""; // Clear existing content

            exams.forEach(exam => {
                const listItem = document.createElement("li");
                const button = document.createElement("button");
                button.textContent = exam.name;
                button.onclick = () => loadExam(exam.id);
                listItem.appendChild(button);
                examList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading exams:", error);
            document.getElementById("exam-list").innerHTML = "<p>Error loading exams. Please try again.</p>";
        });
}

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

            // Switch to the exam screen
            document.getElementById("home-screen").style.display = "none";
            document.getElementById("exam-screen").style.display = "block";
        })
        .catch(error => {
            console.error("Error loading exam:", error);
            document.getElementById("exam-container").innerHTML = "<p>Error loading exam. Please try again.</p>";
        });
}

// Function to go back to the home screen
function goBack() {
    document.getElementById("exam-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
}

// Load the list of exams when the page loads
loadExams();