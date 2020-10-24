const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8888;

// configure routes 
var userRouter = require('./routes/user.js');

// configure middleware 
app.use(cors());
app.use('/api/users', userRouter);


app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Furry Fantasy API Server!');
})

app.listen(port, () => {
  console.log(`Furry Fantasy server listening at http://localhost:${port}`);
})
