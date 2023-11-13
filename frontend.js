document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
      loginButton.addEventListener('click', login);
    }
  });
  
  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === "" || password === ""){
      alert("Please enter username and password");
      return;
    }
  
    fetch('https://francis-mwaniki.github.io/nodejs-jwt/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data.token === undefined){
          alert("Invalid username or password");
          return;
        }
        localStorage.setItem('token', data.token);
        let token = localStorage.getItem('token');
        console.log(token);
        if (token !== undefined) {
          window.location.href = 'https://francis-mwaniki.github.io/nodejs-jwt/dashboard';
        }
       
      })
      .catch(error => console.error('Error:', error));
  }
  
