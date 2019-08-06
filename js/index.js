// Model // state
class TodoData {
	constructor() {
		this.list = JSON.parse(localStorage.getItem("todoList") || "[]");
	}

	save(value) {
		this.list.push(value);
		localStorage.setItem("todolist", JSON.stringify(this.list));
	}

	delete(index) {
		this.list = this.list.slice(0, index).concat(this.list.slice(index + 1));
		localStorage.setItem("todolist", JSON.stringify(this.list));
	}
}

// App

class App {
    constructor(){
        // Initialize Model
        this.todos = new TodoData();
    }
}

const data = new TodoData();
data.save("Hi");
data.save("lol");
console.log(data.list);

data.delete(1);
console.log(data.list);
const root = document.getElementById("root");
