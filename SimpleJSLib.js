let btn = document.querySelector(".addBook");
let elementUI = document.querySelector(".book-list");
elementUI.classList.add("book-UI");

class Book{
    constructor (title,author,read=false){
        this.title = title; 
        this.author = author; 
        this.id = crypto.randomUUID();
        this.read = read; 
    }
    toggleReadStatus () {
        return this.read = !this.read; 
    }
}

class createFormInDOM {
    constructor (){
        this.formElement = document.createElement("form");
    
        this.formInputAuthor = document.createElement("input");
        this.formInputAuthor.type = "text";
        this.formInputAuthor.placeholder = "Author Name";
        this.formInputAuthor.classList.add("author-input");
        
        this.formInputTitle = document.createElement("input");
        this.formInputTitle.type = "text"; 
        this.formInputTitle.placeholder = "Title";
        this.formInputTitle.classList.add("title-input");
        
        this.formSubmitButton = document.createElement("button");
        this.formSubmitButton.textContent = "Add Book";
        this.formSubmitButton.type = "submit"; 
    }
    render () {
        this.formElement.appendChild(this.formInputAuthor);
        this.formElement.appendChild(this.formInputTitle);
        this.formElement.appendChild(this.formSubmitButton);

        elementUI.appendChild(this.formElement);
    }
    handleClick (){
        this.formSubmitButton.addEventListener("click", (event) => libManager.addNewBook(event));   
    }
}

class LibManager {
    constructor (){
        this.myLibrary = [];
    }
    render () { 
        this.myLibrary.forEach((element) => {
            console.log("display element", element);
            let createEl = new createAndPopulateTable(element);
            createEl.render();
        })  
    }
    addBookToLibrary(title,author){
        let newBook = new Book (title, author);
        this.myLibrary.push(newBook);
    }
    removeBookFromLibrary(bookID){
        this.myLibrary = this.myLibrary.filter(book=>book.id!=bookID);
    }
    addBookFunct(){
        this.bookUI = new createFormInDOM(); 
        this.bookUI.render();
        this.bookUI.handleClick();
        btn.disabled = true;
    }
    addNewBook(event){
        event.preventDefault(); 
    
        let author = document.querySelector(".author-input").value;
        let title = document.querySelector(".title-input").value;
        
        let book = new Book (title,author); 
        this.myLibrary.push(book);
        let bookUIEL = new createAndPopulateTable(book);
        bookUIEL.render();
        console.log(book);
    
        document.querySelector(".author-input").value = ""; 
        document.querySelector(".title-input").value = "";  
    }
}

let libManager = new LibManager();
btn.addEventListener("click", () => libManager.addBookFunct());

class createAndPopulateTable{
    constructor(Book){
        this.book = Book;

        this.elementTitle = document.createElement("p");
        this.elementAuthor = document.createElement("p");

        this.bookElement = document.createElement("p");
        this.bookElement.dataset.book = Book.id;

        this.titleContent = document.createTextNode("Title:" +' '+ Book.title);
        this.authorContent = document.createTextNode("Author:" + ' '+ Book.author);
        
        this.readStatusButton = document.createElement("button"); 
        
        this.elementButton = document.createElement("button");
        this.elementButton.textContent="Delete?";
        this.elementButton.classList.add("remove-btn");
        this.elementButton.addEventListener("click", (event)=>this.deleteBook(event)); 
    }
    render (){
        this.elementTitle.appendChild(this.titleContent);
        this.elementAuthor.appendChild(this.authorContent);
        this.bookElement.appendChild(this.elementTitle); 
        this.bookElement.appendChild(this.elementAuthor);
        this.bookElement.appendChild(this.elementButton);
        this.readStatus();
        this.bookElement.appendChild(this.readStatusButton); 

        elementUI.appendChild(this.bookElement);

        console.log("data book is", this.bookElement.dataset.book)
    }
    deleteBook (event) {
        console.log("delete in progress")
        this.bookElement = event.target.closest("[data-book]");
        this.bookID = this.bookElement.dataset.book;
        libManager.removeBookFromLibrary(this.bookID);
        this.bookElement.remove();
    }
    readStatus(){
        this.readStatusButton.textContent = this.book.read ? "Mark as Unread" : "Mark as Read";
        this.readStatusButton.addEventListener("click", ()=>{
            this.book.toggleReadStatus(); 
            this.readStatusButton.textContent = this.book.read ? "Mark as Unread" : "Mark as Read"; 
        })  
    }
}
