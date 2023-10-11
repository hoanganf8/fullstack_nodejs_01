/*
Authentication -> Xác thực
=> Đăng nhập, đăng ký,...

Authorization -> Vai trò, ủy quyền
=> Được làm gì? Quyền hạn như thế nào?

1. Authentication
- Session-based Authentication
- Token-based Authentication
*/

import { config } from "./config.js";
import { client } from "./client.js";

const { SERVER_AUTH_API } = config;

client.setUrl(SERVER_AUTH_API);

const render = () => {
  const root = document.querySelector("#root");
  const loginHtml = `<div class="container py-3">
<h2 class="text-center">Đăng nhập</h2>
<hr>
<form action="" class="login">
  <div class="mb-3">
    <label for="">Email</label>
    <input type="email" class="form-control email" placeholder="Email..." required />
  </div>
  <div class="mb-3">
    <label for="">Password</label>
    <input type="password" class="form-control password" placeholder="Password..." required />
  </div>
  <div class="d-grid">
    <button class="btn btn-primary">Đăng nhập</button>
  </div>
</form>
</div>`;

  const welcomeHtml = `
<div class="container py-3">
    <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
</div>`;
  if (localStorage.getItem("access_token")) {
    root.innerHTML = welcomeHtml;
  } else {
    root.innerHTML = loginHtml;
  }
};

render();

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailEl = e.target.querySelector(".email");
  const passwordEl = e.target.querySelector(".password");

  const email = emailEl.value;
  const password = passwordEl.value;

  handleLogin({ email, password });

  emailEl.value = "";
  passwordEl.value = "";
});

const handleLogin = async (data) => {
  const { data: tokens } = await client.post("/auth/login", data);
  const { access_token, refresh_token } = tokens;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  render();
};

/*
Storage
1. localStorage: Lưu trữ vĩnh viễn
2. sessionStorage: Lưu trữ theo phiên
3. cookie: Lưu trữ có thời hạn

-> Chỉ lưu trữ Text
*/
