import { $, getAllTaskDiv } from './utils/funcs.js'
import { TaskManager } from './services/task_manager.js'

getAllTaskDiv()

/** @type {HTMLFormElement} */
const form = $('#task-creator')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    /**
     * @typedef {Object} FormCreator
     * @property {string} content
     */
    /** @type {FormCreator} */
    const { content } = Object.fromEntries(formData)

    if (content !== '') {
        TaskManager.create(content)
        getAllTaskDiv()
    }
})
