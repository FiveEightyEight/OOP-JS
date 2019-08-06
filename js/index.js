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

	intializeViews() {
		const root = document.getElementById("root");
		let applicationHTML = "";

		for (let view of this.views) {
			applicationHTML += `<div id="${view.name}">${view.render()}</div>`;
		}

		root.innerHTML = applicationHTML;
	}

	addView(view, html) {
		this.views.push(new View(view, html));
	}

	addEvent(element, event, handler) {
		const domE = document.querySelector(element);
		domE.addEventListener(event, handler);
	}

	rerenderView(name) {
		for (let view of this.views) {
			if (view.name === name) {
				const domE = document.querySelector("#" + view.name);
				domE.innerHTML = view.render();
			}
		}
	}
}

const app = new App();

app.addView(
	"header",
	() => `
<div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Todo List App</h1>
    </div>
</div>
`,
);

app.addView(
	"input",
	() => `
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

app.addView("list", () => {
	let list = '<ul class="list-group mx-3">';

	for (let i = 0; i < app.todos.list.length; i++) {
		list += `<li class="list-group-item" data-i="${i}">${
			app.todos.list[i]
		}</li>`;
	}
	list += "</ul>";
	return list;
});

app.intializeViews();
app.addEvent(".js-add", "click", e => {
	e.preventDefault();
	const input = document.querySelector(".js-text-input");
	if (input.value.trim() !== "") {
		app.todos.save(input.value);
		input.value = "";
		app.rerenderView("list");
	}
});

app.addEvent("#list", "click", e => {
	const index = parseInt(e.target.attributes["data-i"].value);
	app.todos.delete(index);
	app.rerenderView("list");
});
