import { TaskManager } from '../services/task_manager.js'

export const $ = (query) => document.querySelector(query)

export const getAllTaskDiv = () => {
    getTaskDivByStatus('todo', 1)
    getTaskDivByStatus('doing', 2)
    getTaskDivByStatus('done', 3)
}

/** @param {'todo' | 'doing' | 'done'} status */
export const getTaskDivByStatus = (status = 'todo', statusNumber = 1) => {
    /** @type {HTMLDivElement} */
    const todoDiv = $(`#${status}`)
    todoDiv.innerHTML = ''

    const todo = TaskManager.getTasks(statusNumber)
    const todoCards = todo.map((t) => {
        const card = document.createElement('div')
        const contentDiv = document.createElement('div')
        const deleteButton = document.createElement('button')
        const beforeButton = document.createElement('button')
        const afterButton = document.createElement('button')

        contentDiv.innerHTML = t.content
        deleteButton.innerHTML = 'Borrar'
        beforeButton.innerHTML = 'Mover Atrás'
        afterButton.innerHTML = 'Mover Adelante'

        deleteButton.addEventListener('click', () => {
            TaskManager.delete(t.id)
            getAllTaskDiv()
        })

        beforeButton.addEventListener('click', () => {
            const newStatus = t.status - 1

            if (newStatus === 0) TaskManager.changeStatus(t.id, 3)
            else TaskManager.changeStatus(t.id, newStatus)

            getAllTaskDiv()
        })

        afterButton.addEventListener('click', () => {
            const newStatus = t.status + 1

            if (newStatus === 4) TaskManager.changeStatus(t.id, 1)
            else TaskManager.changeStatus(t.id, newStatus)

            getAllTaskDiv()
        })

        card.append(contentDiv, deleteButton, beforeButton, afterButton)

        return card
    })

    todoDiv.append(...todoCards)
}
