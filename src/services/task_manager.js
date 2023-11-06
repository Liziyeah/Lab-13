/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} content
 * @property {number} status
 */
/** @typedef {Task[]} Tasks */

export class TaskManager {
    /** @returns {Tasks} */
    static #getLocalStorage() {
        if (!localStorage.getItem('tasks')) localStorage.setItem('tasks', '[]')

        let data = localStorage.getItem('tasks')
        data = JSON.parse(data)

        return data
    }

    /** @param {Tasks} tasks  */
    static #saveLocalStorage(tasks) {
        const data = JSON.stringify(tasks)

        localStorage.setItem('tasks', data)
    }

    /**
     * @param {number} status
     * @returns {Tasks}
     */
    static getTasks(status) {
        const data = this.#getLocalStorage()

        if (!status) return data

        const tasks = data.filter((t) => t.status === status)

        return tasks
    }

    /** @param {Task['content']} content  */
    static create(content) {
        const data = this.#getLocalStorage()
        const task = {
            id: crypto.randomUUID(),
            content,
            status: 1,
        }
        const tasks = [...data, task]

        this.#saveLocalStorage(tasks)
    }

    /**
     * @param {Task['id']} id
     * @param {Task['status']} status
     */
    static changeStatus(id, status) {
        const data = this.#getLocalStorage()
        const task = data.find((t) => t.id === id)
        task.status = status
        const tasks = data.map((t) => (t.id === id ? task : t))

        this.#saveLocalStorage(tasks)
    }

    /** @param {Task['id']} id  */
    static delete(id) {
        const data = this.#getLocalStorage()
        const tasks = data.filter((t) => t.id !== id)

        this.#saveLocalStorage(tasks)
    }
}
