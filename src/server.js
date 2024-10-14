const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const cors          = require('cors');

require('dotenv').config();
const db            = require('./config/db');
const UserRoute     = require('./routes/UserRoutes');
const TodoRoute     = require("./routes/TodoRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

PORT        = process.env.PORT;
IP_SERVER   = process.env.IP_SERVER;

const StartServer = async ()=> {
    try {

        await db.authenticate({ force: false });

        app.use('/api/user', UserRoute);
        app.use('/api/todos', TodoRoute);

        app.listen(PORT, () => {
            console.log(`Your Server is running at http://${IP_SERVER}:${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
        console.log("Unable to start server");
    }
} 

StartServer();