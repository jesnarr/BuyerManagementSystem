require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api', require('./routes/userRouter'));


//connect to mongoose
const dbConfig = process.env.dbConfig;

mongoose.connect(`${dbConfig}`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

//connecting to server
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`)); // server is running
