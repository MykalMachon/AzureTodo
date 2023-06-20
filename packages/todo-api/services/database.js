import { CosmosClient } from '@azure/cosmos';

class MockDatabase {
    constructor() {
        this.users = {};
        this.todos = {};
        this.settings = {};
    }

    async init() {
        // nothing to do
    }

    async saveSettings(userId, settings) {
        await this.#delay();
        this.settings[userId] = settings;
    }

    async getSettings(userId) {
        await this.#delay();
        return this.settings[userId];
    }

    async saveUser(user) {
        await this.#delay();
        this.users[user.id] = user;
    }

    async getUser(userId) {
        await this.#delay();
        return this.users[userId];
    }

    async saveTodoItem(todoItem) {
        await this.#delay();
        if (!this.todos[todoItem.userId]) {
            this.todos[todoItem.userId] = [];
        }
        const usersTodos = this.todos[todoItem.userId];
        if (!todoItem.id) {
            // generate UUID for new todo item
            todoItem.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
        const existingTodo = usersTodos.find(t => t.id == todoItem.id);
        if (existingTodo) {
            Object.assign(existingTodo, todoItem);
        } else {
            usersTodos.push(todoItem);
        }
        return todoItem;
    }

    async deleteTodoItem(todoId, userId) {
        await this.#delay();
        const usersTodos = this.todos[userId];
        console.log(usersTodos);
        if (usersTodos) {
            // found your user todos
            const index = usersTodos.findIndex(t => t.id == todoId);
            console.log(index);
            if (index >= 0) {
                usersTodos.splice(index, 1);
            }
        }
        return null;
    }

    async getTodoItemsByUser(userId) {
        await this.#delay();
        const usersTodos = this.todos[userId];
        console.log(`userTodos: ${usersTodos}`)
        if (usersTodos !== undefined) {
            console.log("userTodos are defined")
            return usersTodos;
        } else {
            console.log('userTodos are undefined')
            return []
        }
    }

    async getTodoItemById(todoId, userId) {
        await this.#delay();
        const usersTodos = this.todos[userId];
        if (usersTodos) {
            return usersTodos.find(t => t.id == todoId);
        }
        return null;
    }

    async #delay() {
        return new Promise(resolve => setTimeout(resolve, 50));
    }
}

class Database {
    constructor(connectionString) {
        this.client = new CosmosClient(connectionString);

        this.users;
        this.todos;
        this.settings;
    }

    async init() {
        const { database } = await this.client.databases.createIfNotExists({ id: 'todo-db' });
        const { container: userContainer } = await database.containers.createIfNotExists({ id: 'users' });
        const { container: todosContainer } = await database.containers.createIfNotExists({ id: 'todos' });
        const { container: settingsContainer } = await database.containers.createIfNotExists({ id: 'settings' });

        this.users = userContainer;
        this.todos = todosContainer;
        this.settings = settingsContainer;
    }

    async saveUser(user) {
        await this.users.items.upsert(user);
    }

    async getUser(userId) {
        const { resource } = await this.users.item(userId).read();
        return resource;
    }

    async saveTodoItem(todoItem) {
        await this.todos.items.upsert(todoItem);
    }

    async deleteTodoItem(todoId, userId = "") {
        await this.todos.item(todoId).delete();
    }

    async getTodoItemsByUser(userId) {
        // get all todos for a specific user
        const { resources } = await this.todos.items.query(`SELECT * FROM todos t WHERE t.userId = "${userId}"`).fetchAll();
        return resources;
    }

    async getTodoItemById(todoId) {
        const { resource } = await this.todos.item(todoId).read();
        return resource;
    }

    async saveSettings(userId, settings) {
        await this.settings.items.upsert({ id: userId, settings });
    }

    async getSettings(userId) {
        const { resource } = await this.settings.query(`SELECT * FROM settings s WHERE s.userId = "${userId}"`).fetchAll();
        return resource.settings;
    }
}

let database = null
if (process.env.NODE_ENV == 'DEV' || process.env.COSMOS_CONNECTION_STRING == undefined) {
    console.log('Using mock database');
    console.log(`either NODE_ENV or COSMOS_CONNECTION_STRING is not set.`);
    database = new MockDatabase();
} else {
    database = new Database(process.env.COSMOS_CONNECTION_STRING);
    database.init();
}

export default database;