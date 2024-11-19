const addStudentForm = document.getElementById("addStudentForm");
const studentsContainer = document.getElementById("studentsContainer");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem('students')) || []; 

const TELEGRAM_API_URL = `https://api.telegram.org/bot7596278476:AAGnXK45RPs-khDJMPSxUosotIaxU7FRFuQ/sendMessage`;
const CHANNEL_ID = '-1002434227412';

addStudentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const studentName = document.getElementById("studentName").value.trim();
  const percentage = document.getElementById("percentage").value;
  const date = document.getElementById("date").value;

  if (studentName && date && percentage >= 0 && percentage <= 100) {
    addStudent(studentName, percentage, date);
    addStudentForm.reset();
  }
});

function addStudent(name, percentage, timestamp) {
  const student = {
    name,
    percentage,
    timestamp
  };
  students.push(student);
  displayStudents(students);
  localStorage.setItem('students', JSON.stringify(students)); 
  
  sendTelegramMessage(student);
}

function displayStudents(studentsList) {
  studentsContainer.innerHTML = ""; 

  const sortedStudents = studentsList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  sortedStudents.forEach((student) => {
    const studentItem = document.createElement("li");
    studentItem.classList.add("student-item");
    studentItem.innerHTML = `
      <span>${student.name}</span> 
      <span>${student.timestamp}</span>
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

function sendTelegramMessage(student) {
  const message = `${student.name}, ${student.timestamp} kuni ${student.percentage}% oldi`;

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

displayStudents(students);