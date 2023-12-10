import express from "express";
import expressLayouts from "express-ejs-layouts";
import routerIndex from "./routes/index.js";
import routerUsers from "./routes/users.js";
import routerAuth from "./routes/auth.js";
import authMiddleware from "./middlewares/auth.middleware.js";
const app = express();
const port = 8080;

//Static file
app.use(express.static("public"));

//Setup template engine
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts); //Sử dụng layout
app.set("layout", "layouts/layout.default.ejs"); //Thay đổi đường dẫn layout mặc định

//Routing
app.use(routerAuth);
app.use(authMiddleware);
app.use(routerIndex);
app.use("/users", routerUsers);

//Listener
app.listen(port, () => {
  console.log("Server đang chạy: http://localhost:8080");
});
