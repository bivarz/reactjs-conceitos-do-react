import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'


// Crie uma nova task com um id random, não permita criar caso o título seja vazio.
// Remova uma task da listagem pelo ID
// Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {

    if (newTaskTitle === '') {
      return
    }

    const id = parseInt((10000 * Math.random()).toFixed(0));

    setTasks([...tasks, {
      id: id,
      title: newTaskTitle,
      isComplete: false
    }])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {

    const newTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)
    setTasks(newTask)
  }

  function handleRemoveTask(id: number) {
    const toRemove = tasks.filter(task => task.id !== id)
    setTasks(toRemove)

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}