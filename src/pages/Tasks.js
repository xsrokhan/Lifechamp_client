import React, { useContext } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrashAlt } from "react-icons/fa"
import { Context } from '../Context'
import { LangProvider } from '../LangProvider'
require('dayjs/locale/ar-sa')
dayjs.extend(localizedFormat)


export const Tasks = ({ tasks, setTasks, userData, setUserData, pastTasks, setPastTasks, setTaskChecked, setTaskDone, setUserDataChanged }) => {
  const { lang } = useContext(Context)

  function done(i, taskId) {
    const task = tasks.find(task => task.id === taskId)
    task.done = true
    let medal = task.medal
    let taskClone = {...task}
    taskClone.done = true
    taskClone.due = dayjs(dayjs().format("L")).valueOf()
    // getting rid of unnecessary properties for completed tasks
    delete taskClone.id
    delete taskClone.expired
    delete taskClone.checked
    setPastTasks([taskClone, ...pastTasks])
    setTasks([...tasks]) // render the line-through
    const timeout = setTimeout(() => { 
      const tasksCopy = tasks.filter((_, idx) => idx !== i)
      setTasks([...tasksCopy])
      setTaskDone(prev => prev + 1)
      setUserData({...userData, medals: {...userData.medals, [medal]: userData.medals[medal] + 1}, current: [...tasksCopy], past: [taskClone, ...userData.past]})
      setUserDataChanged(prev => prev + 1)
      //Axios.put(`http://localhost:3001/updateUser/${userData._id}`, {...userData, medals: {...userData.medals, [medal]: userData.medals[medal] + 1}, current: [...tasksCopy]})
    }, 500)
  }

  function remove(i) {
    const tasksCopy = tasks.filter((_, idx) => idx !== i)
    setTasks([...tasksCopy])
    setUserData({...userData, current: [...tasksCopy]})
    setUserDataChanged(prev => prev + 1)
    //Axios.put(`http://localhost:3001/updateUser/${userData._id}`, {...userData, current: [...tasksCopy]})
  }

  function getDate(arg) {
    let dt = dayjs(+arg).locale(lang === "LF_en" ? "en" : "ar-sa").format("L")
    return dt + ""
  }

  function checked(id) {
    const task = tasks.find(a => a.id === id)
    task.checked = !task.checked
    setTasks([...tasks])
    setTaskChecked(prev => prev + 1)
  }

  return (
    <>
      <ul className="tasks-ul" style={{justifyContent: tasks.length ? "flex-start" : "center"}}>
        {tasks.length > 0 && <AnimatePresence>
          {tasks.map((task, i) => (
            <motion.li key={task.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.3, type: "spring" } }}
              exit={{ opacity: 0, transition: { type: "spring" } }}
              layout
            >
              <div style={{ textDecoration: tasks.find(a => a.id === task.id).done ? "line-through" : "none", textAlign: lang === "LF_ar" || lang === "LF_fa" ? "right" : "left" }}>{task.task}</div>
              <button disabled={!tasks.find(a => a.id === task.id).checked} onClick={() => done(i, task.id)}>Done</button>
              <div className={task.medal}></div>
              <div style={{color: tasks.find(a => a.id === task.id).expired && "firebrick"}}>{getDate(task.due)}</div>
              <FaTrashAlt onClick={() => remove(i)}/>

              <label className="checkbox-container">
                <input type="checkbox" onChange={() => checked(task.id)} checked={tasks.find(a => a.id === task.id).checked ?? false} />
                <span className="checkmark"></span>
              </label>
            </motion.li>
          ))}
        </AnimatePresence>}
        {!tasks.length && <div className="no-tasks"><LangProvider location="no-tasks" /></div>}
      </ul>
    </>
  );
}
