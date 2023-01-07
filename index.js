import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Route from "./routes/routes.js";

import sequelize from "./config/db.config.js";
import multer from "multer";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();

export const upload = multer({storage: multer.memoryStorage()}) ;

app.use(cors());
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/v1/api', Route(router));

app.get('/*', (req, res) => {
    return res.status(200).json("Invalid Route");
});

sequelize.sync();
// sequelize.sync({alter:true});

app.listen(port, () => {
    console.log("Server is running on PORT", port);
});