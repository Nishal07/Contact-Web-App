const path = require("path");
const express = require("express");
const port = 5000;
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config({
  path: ".env",
});

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const adminRoutes = require("./routers/adminRouter");
const userRoutes = require("./routers/usersRouter");
const contactRoutes = require("./routers/contactsRouter");
const imageRoutes = require("./routers/imageUploader");
const errorHandler = require("./middleware/errorHandller");

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/contactprofile", imageRoutes);

//App Running
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
