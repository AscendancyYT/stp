// Initialize users from local storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Function to add a new user
function addUser() {
  const usernameInput = document.getElementById("username");
  const username = usernameInput.value.trim();

  if (username !== "") {
    users.push({ name: username, strikes: 0 });
    localStorage.setItem("users", JSON.stringify(users));
    usernameInput.value = "";
  }

  window.location.reload();
}

// Function to find a user by name
function findUser(username) {
  return users.find(
    (user) => user.name.toLowerCase() === username.toLowerCase()
  );
}

// Function to add a strike to a user
function setStrike() {
  const searchUserInput = document.getElementById("searchUser");
  const strikeCount = parseInt(document.getElementById("strikeCount").value);
  const username = searchUserInput.value.trim();
  window.location.reload();

  if (username !== "") {
    const user = findUser(username);
    if (user) {
      user.strikes += strikeCount;
      localStorage.setItem("users", JSON.stringify(users));
      searchUserInput.value = "";
    } else {
      alert("User not found.");
    }
  }
}

// Function to remove a strike from a user
function removeStrike() {
  const searchUserInput = document.getElementById("searchUser");
  const strikeCount = parseInt(document.getElementById("strikeCount").value);
  const username = searchUserInput.value.trim();

  if (username !== "") {
    const user = findUser(username);
    if (user) {
      user.strikes = Math.max(0, user.strikes - strikeCount);
      localStorage.setItem("users", JSON.stringify(users));
      searchUserInput.value = "";
      window.location.reload();
    } else {
      alert("User not found.");
    }
  }
}

// Function to remove a user
function removeUser(username) {
  users = users.filter(
    (user) => user.name.toLowerCase() !== username.toLowerCase()
  );
  localStorage.setItem("users", JSON.stringify(users));
}

// user data
let Users = [
  { id: 1, name: "" },
  { id: 2, name: "" },
  { id: 3, name: "" },
];

// Function to display user list
function displayUserList(filteredUsers) {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = ""; // Clear existing list

  filteredUsers.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${user.name}` + ` ` + `${user.strikes}`;
    userListElement.appendChild(listItem);
  });
}

// Function to filter user list based on search query
function filterUsers(searchQuery) {
  const filteredUsers = Users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  displayUserList(filteredUsers);
}

// Load users from localStorage if available
const localStorageUsers = localStorage.getItem("users");
if (localStorageUsers) {
  Users = JSON.parse(localStorageUsers);
}

// Call the function to initially display the user list
displayUserList(Users);

// Event listener for input changes
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function (event) {
  filterUsers(event.target.value);
});
