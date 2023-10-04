import { config } from "./config.js";
import { client } from "./client.js";

const render = (posts) => {
  const postsEl = document.querySelector(".posts");
  postsEl.innerText = ``;
  if (posts.length) {
    posts.forEach(({ id, title, excerpt }) => {
      const postItem = document.createElement("div");
      postItem.classList.add("post-item");
      const h2 = document.createElement("h2");
      const a = document.createElement("a");
      a.innerText = title;
      a.href = "#";
      h2.append(a);
      postItem.append(h2);

      const p = document.createElement("p");
      p.innerText = excerpt;
      postItem.append(p);

      postsEl.append(postItem);
    });
  }
};

const getPosts = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { data } = await client.get(`/posts?${queryString}`);
  render(data);
};

//Khởi tạo các giá trị mặc định
let sort = "id";
let order = "desc";
let keyword = "";

getPosts({
  _sort: sort,
  _order: order,
});

const searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyword = e.target.children[0].value;
  getPosts({
    q: keyword,
    _sort: sort,
    _order: order,
  });
  e.target.children[0].value = "";
});

const sortByEl = document.querySelector(".sort-by");
sortByEl.addEventListener("change", (e) => {
  order = e.target.value === "latest" ? "desc" : "asc";
  getPosts({
    q: keyword,
    _sort: sort,
    _order: order,
  });
});
