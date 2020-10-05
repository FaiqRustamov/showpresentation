

const forms = {
  baseURL: "http://127.0.0.1:8000/",
  register: () => {
    let data = $("#register-form").serializeArray();
    let registerData = {};
    if (data) {
      registerData.username = data[0].value;
      registerData.email = data[1].value;
      registerData.password = data[2].value;
      const request = new XMLHttpRequest();
      request.open("POST", forms.baseURL + "account/register", true);
      request.setRequestHeader("content-type", "application/json");
      request.send(JSON.stringify(registerData));
      request.onload = () => {
        if (request.status != 400) {
          forms.login(registerData.username, registerData.password);
        }
      };
    }
  },
  login: (username = null, password = null) => {
    let userdata = {};
    const request = new XMLHttpRequest();
    request.open("POST", forms.baseURL + "api/token/");
    if (!username || !password) {
      //formnan gelen data ucun burda emeliyyatlar aparilacaq
    } else {
      userdata = { username, password };
    }
    if (!userdata.username && !userdata.password) {
      alert("Invalid username or password");
    }
    request.setRequestHeader("content-type", "application/json");
    request.send(JSON.stringify(userdata));
    request.onload = () => {
      let TokenData = {};
      const expiry = new Date();
      expiry.setDate(1);
      TokenData = JSON.parse(request.responseText);
      document.cookie ="token=" +TokenData.access +"; expires=" + expiry.toUTCString() + "; path=/";
      document.cookie ="refresh_token=" + TokenData.refresh +"; expires=" + expiry.toUTCString() +"; path=/";
    };
  },



};
// const blogs = {
//   baseURL: "http://127.0.0.1:8000/",
//   blogs: () => {
//     let blogData = $(".blog_area").serializeArray();
//     let blogArray = {};
//     console.log(blogData);
//     if (blogData) {
//       blogArray.id = blogData[0].value;
//       blogArray.image = blogData[1].value;
//       blogArray.title = blogData[2].value;
//       blogArray.article=blogData[3].value;
//       console.log(blogArray)
//       const request = new XMLHttpRequest();
//       request.open("GET", blog.baseURL + "blog/allblog", true);
//       request.setRequestHeader("content-type", "application/json");
//       request.send(JSON.stringify(blogArray));

//       request.onload = () => {
//         if (request.status != 400) {
//            col = $("<div>");
//            col.addClass("blog-content col-md-9");
//            $(".blog-content").attr("id");
//            $(".blog-content").attr("image");
//            $(".blog-content").attr("title");
//            $(".blog-content").attr("article");
//            col.append(image);
//            col.append(article);
//            col.append(id);
//            console.log("salam");
//            col.append(title);
// console.log(request.responseText);
//           // const blog_text = document.createElement('div');
//           // blog_text.setAttribute('class','blog-content col-md-9');
//           // const content_title=document.createElement('h2');
//           // content_title.textContent=blogArray.title;
//           // const content_area=document.createElement('p');

//         } else {
//           console.log("You didnt get ");
//         }
//       };
//     }
//   },
// };











$(document).ready(() => {
  document
    .getElementById("register-submit-btn")
    .addEventListener("click", () => {
      forms.register();
    });


});
