const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8080;

// Secret key for signing the JWT
const SECRET_KEY = 'your-secret-key';

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Route to generate a token
app.get('/',(req, res) => {
    res.send("<form method='POST' action='/login'><input type='text' name='username'><input type='text' name='password'><input type='submit'>")
})
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    req.headers.authorization=username
    // For simplicity, we skip actual user validation.
    if (username === 'admin' && password === '123') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

  

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(361).json({ message: 'Invalid token' });
        req.user = user; // Store user data for use in the route
        next();
    });
}

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    req.headers.authorization='Hi';

    res.json({ message: `Welcome, ${req.user.username}!` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
