let books = JSON.parse(localStorage.getItem("books")) || [
  {id:1,title:"JavaScript Basics",author:"John Doe",borrowed:false},
  {id:2,title:"Python Programming",author:"Alex Smith",borrowed:true},
  {id:3,title:"HTML & CSS",author:"David Warner",borrowed:false},
  {id:4,title:"React Guide",author:"Sophia Lee",borrowed:false},
  {id:5,title:"Node.js Mastery",author:"Michael Brown",borrowed:true},
  {id:6,title:"Machine Learning",author:"Andrew Ng",borrowed:false},
  {id:7,title:"Deep Learning",author:"Ian Goodfellow",borrowed:false},
  {id:8,title:"Data Structures",author:"Mark Allen",borrowed:true},
  {id:9,title:"Algorithms",author:"Thomas Cormen",borrowed:false},
  {id:10,title:"Database Systems",author:"Elmasri",borrowed:false}
];


const bookContainer = document.getElementById("bookContainer");
const totalBooks = document.getElementById("totalBooks");
const borrowedBooks = document.getElementById("borrowedBooks");
const availableBooks = document.getElementById("availableBooks");
const searchInput = document.getElementById("searchInput");
const darkBtn = document.getElementById("darkBtn");


function displayBooks(data){

  bookContainer.innerHTML = "";

  data.forEach(book => {

    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>

      <p>Author: ${book.author}</p>

      <span class="status ${book.borrowed ? "borrowed" : "available"}">
        ${book.borrowed ? "Borrowed" : "Available"}
      </span>

      <div class="btn-group">

        <button
          class="${book.borrowed ? "return-btn" : "borrow-btn"}"
          onclick="toggleBorrow(${book.id})"
        >
          ${book.borrowed ? "Return" : "Borrow"}
        </button>

        <button
          class="delete-btn"
          onclick="deleteBook(${book.id})"
        >
          Delete
        </button>

      </div>
    `;

    bookContainer.appendChild(card);
  });

  updateDashboard();
}


function updateDashboard(){

  totalBooks.innerText = books.length;

  const borrowed = books.filter(book => book.borrowed);

  borrowedBooks.innerText = borrowed.length;

  availableBooks.innerText =
    books.length - borrowed.length;
}


function saveBooks(){
  localStorage.setItem("books", JSON.stringify(books));
}


function addBook(){

  const title =
    document.querySelectorAll(".form-group input")[0].value;

  const author =
    document.querySelectorAll(".form-group input")[1].value;

  if(title === "" || author === ""){
    alert("Please fill all fields");
    return;
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    borrowed:false
  };

  books.push(newBook);

  saveBooks();
  displayBooks(books);

  document.querySelectorAll(".form-group input")[0].value = "";
  document.querySelectorAll(".form-group input")[1].value = "";
}


function deleteBook(id){

  books = books.filter(book => book.id !== id);

  saveBooks();
  displayBooks(books);
}


function toggleBorrow(id){

  books = books.map(book => {

    if(book.id === id){

      return {
        ...book,
        borrowed: !book.borrowed
      };
    }

    return book;
  });

  saveBooks();
  displayBooks(books);
}


searchInput.addEventListener("keyup", () => {

  const value = searchInput.value.toLowerCase();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(value)
  );

  displayBooks(filteredBooks);
});


darkBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");
});


document.querySelector(".form-group button")
.addEventListener("click", addBook);


displayBooks(books);