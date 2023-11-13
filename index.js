const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const secretKey = 'yourSecretKey'; // Change this to a secure key in production
// Enable CORS
app.use(cors());

app.use(bodyParser.json());
// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    console.log('Body:', req.body);
  
    const token = req.body.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
  
      req.user = user;
      next();
    });
  };
  
  



// Mock user data (you would typically have a database)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];


app.use(express.static(__dirname, { 'X-Content-Type-Options': 'nosniff' }));

// Home route load index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Protected route (dashboard)
app.post('/dashboard', authenticateJWT, (req, res) => {
    

    const responseData = { message: `Welcome to the dashboard, ${req.user.username}!` };
  
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(responseData));
  });
// Dashboard route load dashboard.html
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});
// Load frontend.js
app.get('/frontend.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.js'));
  });
// Load dashboard.js
// app.get('/dashboard.js', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dashboard.js'));
//   });
// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


  
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
