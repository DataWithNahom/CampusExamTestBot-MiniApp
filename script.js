if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Expand the mini-app to full screen
    tg.expand();

    // Function to load the list of exams
    function loadExams() {
        console.log("Loading exams...");
        fetch('https://datawithnahom.github.io/CampusExamTestBot-MiniApp/exams.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load exams: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(exams => {
                console.log("Exams loaded successfully:", exams);
                const examList = document.getElementById("exam-list");
                examList.innerHTML = ""; // Clear existing content

                // Dynamically generate the list of exams
                exams.forEach(exam => {
                    const listItem = document.createElement("li");
                    const button = document.createElement("button");
                    button.textContent = exam.name;
                    button.onclick = () => loadExam(exam.file); // Pass the full URL
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
    function loadExam(examUrl) {
        console.log(`Loading exam from: ${examUrl}`);
        fetch(examUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load exam: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                console.log("Exam loaded successfully");
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
        console.log("Going back to home screen");
        // Switch back to the home screen
        document.getElementById("exam-screen").style.display = "none";
        document.getElementById("home-screen").style.display = "block";
    }

    // Load the list of exams when the page loads
    loadExams();
} else {
    console.error("Telegram.WebApp is not available. Running outside Telegram.");
    // Fallback for non-Telegram environments (e.g., browser testing)
    document.getElementById("exam-list").innerHTML = "<p>This app is designed to run within Telegram.</p>";
}