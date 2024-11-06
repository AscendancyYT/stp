const addStudentForm = document.getElementById("addStudentForm");
const studentsContainer = document.getElementById("studentsContainer");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem('students')) || []; // Load students from localStorage or initialize as an empty array

const TELEGRAM_API_URL = `https://api.telegram.org/bot7596278476:AAGnXK45RPs-khDJMPSxUosotIaxU7FRFuQ/sendMessage`;
const CHANNEL_ID = '-1002434227412'; // Telegram channel ID

addStudentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const studentName = document.getElementById("studentName").value.trim();
  const percentage = document.getElementById("percentage").value;

  if (studentName && percentage >= 0 && percentage <= 100) {
    addStudent(studentName, percentage);
    addStudentForm.reset();
  }
});

function addStudent(name, percentage) {
  const student = {
    name,
    percentage,
    timestamp: new Date().toISOString(),  // Save the current date and time as a timestamp
  };
  students.push(student);  // Add new student to the students array
  displayStudents(students);  // Display updated list
  localStorage.setItem('students', JSON.stringify(students));  // Save updated list to localStorage
  
  // Send the message to Telegram in Uzbek
  sendTelegramMessage(student);
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function displayStudents(studentsList) {
  studentsContainer.innerHTML = "";  // Clear the list first

  // Sort the students array by timestamp in descending order (latest first)
  const sortedStudents = studentsList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  sortedStudents.forEach((student) => {
    const studentItem = document.createElement("li");
    studentItem.classList.add("student-item");
    studentItem.innerHTML = `
      <span>${student.name}</span> 
      <span>${formatDate(student.timestamp)}</span>
      <span>${student.percentage}%</span>
    `;
    studentsContainer.appendChild(studentItem);
  });
}

searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm)
  );
  displayStudents(filteredStudents);
});

// Function to send message to Telegram
function sendTelegramMessage(student) {
  const message = `${student.name} bugun(${formatDate(student.timestamp)}) ${student.percentage}% oldi`;

  const url = `${TELEGRAM_API_URL}?chat_id=${CHANNEL_ID}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        console.log("Message sent successfully.");
      } else {
        console.error("Failed to send message:", data);
      }
    })
    .catch(error => {
      console.error("Error sending message:", error);
    });
}

// Initialize with students from localStorage
displayStudents(students);
