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

// View
class View {
	constructor(name, render) {
		this.name = name;
		this.render = render;
	}
}

// App
class App {
	constructor() {
		// Initialize Model
		this.todos = new TodoData();
		// My list of view
		this.views = [];
	}

    intializeViews() {}
    
    addView(view, html) {
        this.views.push(new View(name, html));
    }
}

const app = new App();

app.addView(
	"header",
	`
<div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Todo List App</h1>
    </div>
</div>
`,
);

app.addView(
	"input",
	`
<div class="input-group mb-3">
    <input
    type="text"
    class="js-text-input form-control"
    placeholder="Add..."
    />
    <div class="input-group-append">
        <button
        class="js-add btn btn-outline-secondary"
        type="button"
        id="button-addon2"
        >
        Add
        </button>
    </div>
</div>
`,
);

app.addView(
	"list",
	`
<ul class="list-group mx-3">
	<li class="list-group-item" data-i="0">Chicken</li>
</ul>
`,
);
const root = document.getElementById("root");
