const dotenv = require("dotenv");
dotenv.config({ path: "./env" });

const express = require("express");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

const expressFileUpload = require("express-fileupload");
const authRoute = require("./routes/authRoute");
const searchRoute = require("./routes/searchRoute");
const followRoute = require("./routes/followRoute");
const resumeRoute = require("./routes/resumeRoute");

const error = require("./middlewares/error");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressFileUpload());
app.use(cookieParser());
app.use(morgan("tiny"));

const io = require("socket.io")(5500, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});

global.io = io;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API,
	api_secret: process.env.CLOUDINARY_SECRET,
});

app.use("/api/users", authRoute);
app.use("/api/search", searchRoute);
app.use("/api/follow-api", followRoute);
app.use("/api/resumes", resumeRoute);

app.use(error);

app.listen(8000, () => {
	console.log(`Listening on PORT 8000`);
});
