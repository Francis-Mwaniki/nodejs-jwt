
 document.addEventListener('DOMContentLoaded', async function () {
  
  
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token === undefined) {
        window.location.href = '/';
        }

        if(!token){
            window.location.href = '/';
        }
    
 
    
    const request = new Request('https://francis-mwaniki.github.io/nodejs-jwt/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    
    console.log('Request Object:', request);
    
    fetch(request)
  .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if(data.message === undefined){
        window.location.href = '/';
        return;
      }
      const message = document.getElementById('message');
      message.innerHTML = data.message;
    })
    
    
  
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }



  });
  
  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  
