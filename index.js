import express  from "express";
import initApp from "./src/app.router.js";
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT ;

initApp(app,express);

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
});


