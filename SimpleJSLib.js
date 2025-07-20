let myLibrary = [];

function Book(title,author,read=false){
    this.title = title; 
    this.author = author; 
    this.id = crypto.randomUUID();
    this.read = read; 
}

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;
}

console.log (Book); 
console.log ("my library is:",myLibrary);

function addBookToLibrary  (title, author){
    const newBook = new Book (title, author);
    myLibrary.push(newBook);
}

let btn = document.querySelector(".addBook");
let elementUI = document.querySelector(".book-list");

console.log(myLibrary); 

function createAndPopulateTable(Book){
    
    let elementTitle = document.createElement("p");
    let elementAuthor = document.createElement("p");
    // let elementId = document.createElement("p");

    let bookElement = document.createElement("p");

    let titleContent = document.createTextNode("Title:" +' '+ Book.title);
    let authorContent = document.createTextNode("Author:" + ' '+ Book.author);
    // let idContent = document.createTextNode("Author:" + ' '+ Book.id);

    elementTitle.appendChild(titleContent);
    elementAuthor.appendChild(authorContent);
    // elementId.appendChild(idContent);

    bookElement.appendChild(elementTitle); 
    bookElement.appendChild(elementAuthor);
    // bookElement.appendChild(elementId);

    //elementUI.appendChild(bookElement);

    //elementUI.dataset.book = Book.id;
    bookElement.dataset.book = Book.id;

    console.log("data book is", bookElement.dataset.book)

    elementUI.classList.add("book-UI");

    // adding a delete button 
    let elementButton = document.createElement("button");
    bookElement.appendChild(elementButton);

    elementButton.textContent="Delete?";
    elementButton.classList.add("remove-btn");

    elementButton.addEventListener("click", deleteBook);

    let readStatusButton = document.createElement("button"); 
    readStatusButton.textContent = Book.read ? "Mark as Unread" : "Mark as Read";
    readStatusButton.addEventListener("click", ()=>{
        Book.toggleReadStatus(); 
        readStatusButton.textContent = Book.read ? "Mark as Unread" : "Mark as Read"; 
    })
    
    bookElement.appendChild(readStatusButton); 
    elementUI.appendChild(bookElement);
}

myLibrary.forEach((element) => {
    console.log("display element", element);
    createAndPopulateTable(element);
})


function addNewBook(event){
    event.preventDefault(); 

    
    let author = document.querySelector(".author-input").value;
    let title = document.querySelector(".title-input").value;
    // let id = document.querySelector("idContent").value; 
    
    let book = new Book (title,author); 
    addBookToLibrary(title,author); 
    myLibrary.push(book);
    createAndPopulateTable(book);
    console.log(book);


    document.querySelector(".author-input").value = " "; 
    document.querySelector(".title-input").value = " ";  

}

function createFormInDOM (){
    let formElement = document.createElement("form");

    let formInputAuthor = document.createElement("input");
    formInputAuthor.type = "text";
    let formInputTitle = document.createElement("input");
    formInputTitle.type = "text"; 

    let formSubmitButton = document.createElement("button"); 
    
    formElement.appendChild(formInputAuthor);
    formElement.appendChild(formInputTitle);
    formElement.appendChild(formSubmitButton);
    elementUI.appendChild(formElement);
    formInputAuthor.classList.add("author-input");
    formInputTitle.classList.add("title-input");

    elementUI.classList.add("book-UI");
    
   
    //console.log("data book is", elementUI.dataset.book)
    
    formSubmitButton.addEventListener("click", addNewBook);   

}

function addBookFunct(){
    console.log("clicked");
    createFormInDOM();
    // document.querySelector(".addBook").disabled = true;
    btn.disabled = true;

}

btn.addEventListener("click", addBookFunct);

function deleteBook (event){
    const bookElement = event.target.closest("[data-book]");
    const bookID = bookElement.dataset.book;
    removeBookFromLibrary(bookID);
    bookElement.remove();

}

function removeBookFromLibrary(bookID){
    myLibrary = myLibrary.filter(book=>book.id!=bookID);
}






