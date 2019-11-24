//! A small scale todo list application with vanilla js 
//! Written by Adeleke Bright for ACE AFRICA 
//selector is a helper function for 
let selector = e => document.querySelector(e) 

//! The model class will hold the state of the app 
class Model {
	constructor() {
		this.todos = [{
			id : 1 , name : 'Build backend API' , complete : true , date_created : new Date() 
		} , {
			id : 2 , name : 'Design Moses App' , complete : false , date_created : new Date() 
		}]
	} 
	//! This method adds an item to the todos array 
	addItem(item){
		this.todos.unshift({
			id : this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1 , 
			name : item , 
			complete : false  , 
			date_created : new Date()
		})  
	}  
	//! This method takes an id an edit the item 
	edit(id , name) {
		this.todos = this.todos.map(item => 
		item.id === id ? {id : item.id , name : name , complete : item.complete  , 
		date_created : item.date_created } : item 
		)
	} 
	//! This method removes an item from the todo list array 
	removeItem(id){
		this.todos = this.todos.filter(item => item.id !== id)
		
	} 
	//! Toggle if an item is completed or not 
	isDone(id){
		this.todos = this.todos.map(item => 
		item.id === id ? {id : item.id , name : item.name ,
		complete : !item.complete , date_created : item.date_created} : item 
		)
	}
		
} 
//! The class for creating the view of our application 

class View {  
    constructor() { 
	    this.root = this.getElement('#root') //!Root of the application 
		this.body = this.getElement('body')  //! Body of the document 
		this.title = this.createElement('h1') //! Create the title for the app 
		this.title.textContent = 'MVC Designed Todo List App' 
		this.form = this.createElement('form') //! The form for adding an item 
		this.input = this.createElement('input') //! input tag for adding todo item 
		this.input.type = 'text'
		this.input.placeholder = 'Add a todo item '
		this.input.size = 50 
		this.submit = this.createElement('input')  //!Button for submitting an item to be added 
		this.submit.type = 'submit' 
		this.value = 'Add'  
		this.form.append(this.input , this.submit) //! Append the input and submit to form  
		this.body.append(this.title , this.form)   //! Append title and form to body 
        this.todoContainer = this.createElement('ul') 	 //! Unordered list container 
        this.root.append(this.todoContainer)		
	}
	//! A method for creating element 
	createElement(tag){
		return document.createElement(tag) 
	} 
	//! A method for selecting element 
	getElement(selector){
		return document.querySelector(selector)
	}  
	//! Displaying todo list item 
	showTodo(todos) {
	    if ( todos.length === 0) {
		    const p = document.createElement('p') 
		    p.textContent = 'You have no item in your list , create one' 
		    this.root.appendChild(p) 
	    }else {
			//! Use the forEach method of an array to loop through it and create elements 
		    todos.forEach(todo => {
	            const li = document.createElement('li') 
	            li.id = todo.id  
	            //!li.textContent = todo.name 
			    //!Each todo item should have a checkbox that can be toggle to true or false 
			    const checkbox = document.createElement('input') 
			    checkbox.type = 'checkbox'
			    checkbox.checked = todo.complete 
			    //!Each todo item should have a span that will show if an items is done or not 
			    const span = document.createElement('span') 
			    span.contentEditable = true //! To make editing possible 
			    //span.textContent = todo.name   
			    span.classList.add('todo-text') 
				//!Check if todo.complete is through then strike it 
			    if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.name
                    span.append(strike)
                } else {
                    //!Otherwise just display the text
                    span.textContent = todo.name
		        }
                //!The todos will also have a delete button for deleting an item 
                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)
	            //!const ul = document.createElement('ul') 
	            this.todoContainer.appendChild(li) 
		    })
	    }
    }	
}  
//! This class will handle user interaction with the application 

class Controller {
	constructor(model , view) {
		this.model = model 
		this.view = view 
		this.item = this.view.input.value 
		this.model.todos = this.model.todos 
	    this.render()
	} 
	render() {
		return this.view.showTodo(this.model.todos) 
	} 
	//!
	handleSubmit = () => { 
	    this.view.form.addEventListener('submit' , event => {
			event.preventDefault()   
            this.model.addItem(this.view.input.value)  
			this.render()
		})
		
	}
	
} 


let app = new Controller(new Model() , new View())  
