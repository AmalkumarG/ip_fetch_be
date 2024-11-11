const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');  // Used to run shell commands
const path = require('path');
const { log } = require('console');
const app = express();
const port = 3001;
app.use(cors({
    origin: 'http://localhost:3000',  // Only allow this origin
    methods: ['GET', 'POST'],            // Allow GET and POST requests
    allowedHeaders: ['Content-Type'],    // Allow only the Content-Type header
  })); 
  app.use(express.json());
// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
console.log("server starting")
// Endpoint to run the bash script
app.post('/run-script', (req, res) => {
    console.log("ttttttttttttttttt",req.body)
    // Change this to the path of your script
    const scriptPath = './script.sh';  // Make sure the script is in the same directory as server.js
    const username=req.body.username
    const ip=req.body.ip

    exec(`bash ${scriptPath} "${username}" "${ip}"`, (err, stdout, stderr) => {
        console.log("errrrrr",err);
        
        if (err) {
            res.status(500).send('Error running the script: ' + stderr);
            return;
        }
        res.status(200).json({'response ' :true});
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
