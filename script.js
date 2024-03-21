// script.js

// Function to fetch user data
function fetchUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && new Date() - new Date(userData.timestamp) < 60000) {
      displayUserData(userData.data);
    } else {
      const url = 'https://reqres.in/api/users?delay=3';
      fetch(url)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('userData', JSON.stringify({ data, timestamp: new Date() }));
          displayUserData(data.data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }
  
  // Function to display user data in the table
  function displayUserData(userData) {
    const userDataBody = document.getElementById('userDataBody');
    userDataBody.innerHTML = '';
    userData.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}" alt="Avatar" class="avatar"></td>
      `;
      userDataBody.appendChild(row);
    });
  }
  
  // Event listener for the button click to fetch user data
  document.getElementById('getDataButton').addEventListener('click', fetchUserData);
  
  // Fetch user data when the page loads
  document.addEventListener('DOMContentLoaded', fetchUserData);
  