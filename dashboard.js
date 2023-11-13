
 document.addEventListener('DOMContentLoaded', async function () {
  
  
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token === undefined) {
        window.location.href = '/';
        }

        if(!token){
            window.location.href = '/';
        }
    
 
    
    const request = new Request('http://localhost:3000/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    
    console.log('Request Object:', request);
    
    fetch(request);
    
  
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }



  });
  
  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  