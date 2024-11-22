
var bookmarkNameInput = document.getElementById("nameInput");
var bookmarkURLInput = document.getElementById("urlInput");
var addBtn = document.getElementById("addBtn");
var bookmarkList = document.getElementById("bookmarkList");
var nameRegex = /^[A-Za-z0-9\s]{3,30}$/; 
var regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)?$/;

var bookmarks = [];
if (localStorage.getItem("bookmarks") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks(bookmarks);
  console.log(bookmarks)
}else{
    bookmarks=[];
}

function addBookmark(event) {
    event.preventDefault();
    var bookmark = {
        name: bookmarkNameInput.value.toLowerCase(),
        url: bookmarkURLInput.value,
      };
  if (!validateBookmark()) return;
  if (bookmarks.some((b) => b.name === bookmark.name)) {
    Swal.fire({
        title: "Name Error",
        html:`<p>Name should be unique, Please enter a different name</p>`,
        icon: "error",
        color:"#352e28",
        background:"#eee"
    
    });
    return;
  }
  if (bookmarks.some((b) => b.url === bookmark.url)){
    Swal.fire({
        title: "URL Error",
        html:`<p>this URL have been added</p>`,
        icon: "error",
        color:"#352e28",
        background:"#eee"
    
    });
    return;
  }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    console.log(bookmarks);
  
  displayBookmarks(bookmarks);
  clearForm();
}

// Display Bookmarks
function displayBookmarks(list) {
  var output = "";
  list.forEach((bookmark, index) => {
    output += `
      <tr>
     <td>${index+1}</td>
      <td>${bookmark.name}</td>
      <td>
        <a href="${bookmark.url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye me-2 text-white"></i>Visit</a>
      </td>
      <td><button onclick="deleteBookmark(${index})" class="btn btn-delete"><i class="fa-solid fa-trash me-2 text-white"></i>Delete</button></td>
    </tr>
    `;
  });
  bookmarkList.innerHTML = output;
}

// Delete Bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks(bookmarks);
}
// Clear Form
function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}

bookmarkNameInput.addEventListener("input", function () {
    validateName();
  });
  
  bookmarkURLInput.addEventListener("input", function () {
    validateURL();
  }); 

  function validateName() {
    var name = bookmarkNameInput.value;
    if (nameRegex.test(name)) {
      bookmarkNameInput.classList.remove("is-invalid");
      bookmarkNameInput.classList.add("is-valid");
    } else {
      bookmarkNameInput.classList.remove("is-valid");
      bookmarkNameInput.classList.add("is-invalid");
    }
  }
  
  function validateURL() {
    var url = bookmarkURLInput.value;
    if (url === "") {
      bookmarkURLInput.classList.remove("is-valid", "is-invalid");
    } else if (isValidURL(url)) {
      bookmarkURLInput.classList.remove("is-invalid");
      bookmarkURLInput.classList.add("is-valid");
    } else {
      bookmarkURLInput.classList.remove("is-valid");
      bookmarkURLInput.classList.add("is-invalid");
    }
  }


  function isValidURL(url) {
    return regex.test(url);
  }
  
function validateBookmark() {
    var name = bookmarkNameInput.value;
    var url = bookmarkURLInput.value;
    if (!nameRegex.test(name)) {
        Swal.fire({
            title: "Name Error",
            html:`<p>Please enter a valid name</p>`,
            icon: "error",
            color:"#352e28",
            background:"#eee"
        });
      return false;
    }
    if (url === "") { 
        Swal.fire({
            title: "URL empty Error",
            html:`<p>Please enter a URL</p>`,
            icon: "error",
            color:"#352e28",
            background:"#eee"
        });
      return false;
    }
    if (!isValidURL(url)) { 
        Swal.fire({
            title: "URL Error",
            html:`<p>Please enter a valid URL (must start with http:// or https://).</p>`,
            icon: "error",
            color:"#352e28",
            background:"#eee"
        });
        return false;
    }
    return true;
  }
addBtn.addEventListener("click", addBookmark);
