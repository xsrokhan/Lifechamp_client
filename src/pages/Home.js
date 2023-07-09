import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import { Login } from './Login'
import { Tasks } from './Tasks'
import { Statistics } from './Statistics'
import { Activity } from './Activity'
import { Highlights } from './Highlights'
import { Profile } from './Profile'
import { FAQ } from './FAQ'
import { AddTask } from '../AddTask'
import { ReactCalendar } from '../Calendar'
import { LangProvider } from '../LangProvider'
import { PlaceholderProvider } from '../LangProvider'
import '../styles/Home.css'
import { Routes, Route, Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa"
import { FaTasks } from "react-icons/fa"
import { FaChartPie } from "react-icons/fa"
import { FaChartLine } from "react-icons/fa"
import { FaQuestion } from "react-icons/fa"
import { FaMedal } from "react-icons/fa"
import { FaUser } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import { SlLogout } from "react-icons/sl"
import { SlNote } from "react-icons/sl"
import { Context } from '../Context'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ArcElement
} from 'chart.js'
dayjs.extend(localizedFormat)

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ArcElement
)

function getTasksForPeriod(pastTasks, selectedPeriod) { 
  const oneDay = 86400000
  let currentDate = dayjs(dayjs().format("L")).valueOf() // current day at 00:00 locally
  let tasksArr = []
  pastTasks.forEach(task => {
    if (currentDate - (+selectedPeriod * oneDay) <= task.due) { // includes today's day
      tasksArr.push(task)
    }
  })
  return tasksArr
}

function getCompletionRate(pastTasks) {
  let total = pastTasks.length
  let complete = 0
  let incomplete = 0
  let completionColor = document.querySelector("body").getAttribute("data-theme") === "dark" ? "#5d738b" : "#944747"
  pastTasks.forEach(task => task.done ? complete++ : incomplete++)
  complete = complete * 100 / total
  incomplete = incomplete * 100 / total
  return {
    data: pastTasks.length ? [complete, incomplete] : [100],
    backgroundColor: pastTasks.length ? [completionColor, "grey"] : ["#d3d3d3"]
  } 
}

function getMedalsData(pastTasks) {
  let medals = { "gold": 0, "silver": 0, "bronze": 0}
  pastTasks.forEach(task => task.done ? medals[task.medal]++ : null)
  let medalsEarned = pastTasks.some(task => task.done)
  return {
    medalsEarned,
    data: pastTasks.length && medalsEarned ? Object.values(medals) : [100],
    backgroundColor: pastTasks.length && medalsEarned ? ["#FFD700", "#C0C0C0", "#CD7F32"] : ["#d3d3d3"]
  }
}

function getActivityData(pastTasks, selectedPeriod) {
  let allDaysForPeriod = {}
  let today = dayjs(dayjs().format("L")).valueOf()
  const oneDay = 86400000
  let todaysColor = document.querySelector("body").getAttribute("data-theme") === "dark" ? "#5d738b" : "#944747"
  let pastDaysColor = document.querySelector("body").getAttribute("data-theme") === "dark" ? "#f4f0ec" : "black"
  let newBorderColor = document.querySelector("body").getAttribute("data-theme") === "dark" ? "#989898" : "#f5f5f5"
  for (let i = 1; i <= +selectedPeriod; i++) {
    allDaysForPeriod[today - (i * oneDay)] = 0
  }
  allDaysForPeriod = {...allDaysForPeriod, [today]: 0}
  pastTasks.forEach(task => 
    task.done ? 
    allDaysForPeriod[dayjs(dayjs(task.due).format("L")).valueOf()] += 1 :
    null
    )
  // reversing entries except last (today) to keep the correct order
  let newLabels = [...Object.keys(allDaysForPeriod).slice(0, -1).reverse().map(date => dayjs(+date).format("L"))] // the second array item (label for today) is added in Activity
  let newData = [...Object.values(allDaysForPeriod).slice(0, -1).reverse(), Object.values(allDaysForPeriod).slice(-1)[0]]
  return {
    labels: newLabels,
    data: newData,
    backgroundColor: [...Array(Object.keys(allDaysForPeriod).length - 1).fill(pastDaysColor), todaysColor],
    borderColor: newBorderColor
  }
}

export const Home = () => {
  // Theme state
  const { theme } = useContext(Context)

  // Lang state
  const { lang } = useContext(Context)

  // User data state
  const { userData, setUserData } = useContext(Context)
  const [userDataChanged, setUserDataChanged] = useState(0)

  // Login and page states
  const { loggedIn, setLoggedIn } = useContext(Context)
  const [logoutAnimation, setLogoutAnimation] = useState(false)
  const { selectedSection, setSelectedSection } = useContext(Context)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchPeriodVal, setSearchPeriodVal] = useState("")

  // Task states
  const [tasks, setTasks] = useState(userData ? userData.current : [])
  const [pastTasks, setPastTasks] = useState(userData ? userData.past : [])
  const [newTaskWindow, setNewTaskWindow] = useState(false)
  const [newTaskCloseAnim, setNewTaskCloseAnim] = useState(false)
  const [selectedMedal, setSelectedMedal] = useState("bronze")
  const [newTask, setNewTask] = useState("")
  const [newTaskDue, setNewTaskDue] = useState(dayjs().valueOf())
  const [taskChecked, setTaskChecked] = useState(0)
  const [taskDone, setTaskDone] = useState(0)
  const placeHolderVal = PlaceholderProvider()

  // Statistics and activity states
  const [selectedPeriod, setSelectedPeriod] = useState("7") // needed for updating activity state
  const [tasksForPeriod, setTasksForPeriod] = useState(getTasksForPeriod(pastTasks, selectedPeriod))
  const [pieChartTasks, setPieChartTasks] = useState([]) // needed for Statistics, gets updated after period is applied instead of on input change
  const medalsEarned = getMedalsData(tasksForPeriod).medalsEarned // needed for Statistics, returns a boolean
  const [completionRateData, setCompletionRateData] = useState({
    labels: null, // changes according to the language in Statistics
    datasets: [{
      data: getCompletionRate(tasksForPeriod).data,
      backgroundColor: getCompletionRate(tasksForPeriod).backgroundColor,
      tooltip: {
        callbacks: {
            label: function(context) {
                let value = context.formattedValue
                return tasksForPeriod.length ? " " + Math.round(value) + "%" : ""
            }
        }
    }
    }]
  })
  const [medalsData, setMedalsData] = useState({ // flip side data
    labels: null, // changes according to the language in Statistics
    datasets: [{
      data: getMedalsData(tasksForPeriod).data,
      backgroundColor: getMedalsData(tasksForPeriod).backgroundColor,
      tooltip: {
        callbacks: {
            label: function(context) {
                let value = context.formattedValue
                return tasksForPeriod.length && tasksForPeriod.some(task => task.done) ? " " + value : ""
            }
        }
    }
    }]
  })
  const [activityData, setActivityData] = useState({ 
    labels: getActivityData(tasksForPeriod, selectedPeriod).labels,
    datasets: [{
      data: getActivityData(tasksForPeriod, selectedPeriod).data, 
      backgroundColor: getActivityData(tasksForPeriod, selectedPeriod).backgroundColor,
      borderColor: getActivityData(tasksForPeriod, selectedPeriod).borderColor,
      tooltip: {
        callbacks: {
          label: function(context) {
              let value = context.formattedValue
              return tasksForPeriod.length ? + value : ""
          }
      }
    }
    }]
  })

  function checkIfExpired() {
    let oneDay = 86400000
    let currentTime = dayjs().valueOf()
    tasks.forEach(task => {
      if (currentTime > task.due + oneDay) { // task.due (00:00) + oneDay = end of day
        task.expired = true
      }
    })
    let expiredTasks = tasks.filter(task => task.expired === true)
    expiredTasks.forEach(task => {
      delete task.id
      delete task.expired
    })
    setTasks([...tasks])
    setPastTasks([...expiredTasks, ...pastTasks])
    setUserData({...userData, past: [...expiredTasks, ...pastTasks]})
  }

  useEffect(() => { // check if there are expired tasks on load and input check
    checkIfExpired()
  }, [taskChecked])

  useEffect(() => { 
    setTasksForPeriod(getTasksForPeriod(pastTasks, selectedPeriod))
  }, [pastTasks])

  useEffect(() => { 
    applyPeriod()
  }, [taskDone])

  function logout() {
    setLogoutAnimation(true)
    let timer = setTimeout(() => {setLoggedIn(false); localStorage.setItem("LF_loggedIn", "false"); setLogoutAnimation(false); setSelectedSection("tasks"); sessionStorage.setItem("LF_selectedSection", "tasks"); setSelectedPeriod(7); setNewTaskDue(dayjs().valueOf())}, 400)
    return () => clearTimeout(timer)
  }

  function underlineSelected(e) {
    let section = e.target.name
    setSelectedSection(section)
    sessionStorage.setItem("LF_selectedSection", section)
  }

  function addNewTask() {
      const id = tasks.length ? tasks[0].id - 1 : 0
      setTasks([{task: newTask.trim(), medal: selectedMedal, due: newTaskDue, id, done: false}, ...tasks])
      setUserData({...userData, current: [{task: newTask.trim(), medal: selectedMedal, due: newTaskDue, id, done: false}, ...userData.current]})
      setUserDataChanged(prev => prev + 1)
      setNewTask("")
      setSelectedMedal("bronze")
      setNewTaskDue(dayjs(dayjs().format("L")).valueOf())
  }
  
  function handleCloseNewTask() {
    setNewTaskCloseAnim(true)
    const timeout = setTimeout(() => {
      setNewTaskWindow(false)
      setNewTaskCloseAnim(false)
    }, 500)
  }

  function applyPeriod() {
    setPieChartTasks(tasksForPeriod)
    setCompletionRateData({
      labels: null, // changes according to the language in Statistics
      datasets: [{
        data: getCompletionRate(tasksForPeriod).data,
        backgroundColor: getCompletionRate(tasksForPeriod).backgroundColor,
        tooltip: {
          callbacks: {
              label: function(context) {
                  let value = context.formattedValue
                  return tasksForPeriod.length ? " " + Math.round(value) + "%" : ""
              }
          }
      }
      }]
    })
    setMedalsData({ 
      labels: null, //getMedalsData(tasksForPeriod).labels,
      datasets: [{
        data: getMedalsData(tasksForPeriod).data,
        backgroundColor: getMedalsData(tasksForPeriod).backgroundColor,
        tooltip: {
          callbacks: {
              label: function(context) {
                  let value = context.formattedValue
                  return tasksForPeriod.length && tasksForPeriod.some(task => task.done) ? " " + value : ""
              }
          }
      }
      }]
    })
    setActivityData({ 
      labels: getActivityData(tasksForPeriod, selectedPeriod).labels,
      datasets: [{
        data: getActivityData(tasksForPeriod, selectedPeriod).data,
        backgroundColor: getActivityData(tasksForPeriod, selectedPeriod).backgroundColor,
        borderColor: getActivityData(tasksForPeriod, selectedPeriod).borderColor,
        tooltip: {
          callbacks: {
            label: function(context) {
                let value = context.formattedValue
                return tasksForPeriod.length ? + value : ""
            }
        }
      }
      }]
    })
    }

    function setPeriod(e) {
      if (!e.target.value || e.target.value[0] === "0") {
        setTasksForPeriod(getTasksForPeriod(pastTasks, "7"))
        setSelectedPeriod("7")
        setSearchPeriodVal("")
      } else if (+e.target.value > 365) {
        setTasksForPeriod(getTasksForPeriod(pastTasks, "365"))
        setSelectedPeriod("365")
        setSearchPeriodVal("365")
      } else {
        setTasksForPeriod(getTasksForPeriod(pastTasks, e.target.value))
        setSelectedPeriod(e.target.value)
        setSearchPeriodVal(e.target.value)
      }
    }

    useEffect(() => { // changing chart colors
      setCompletionRateData({...completionRateData, datasets: [{...completionRateData.datasets[0], backgroundColor: getCompletionRate(tasksForPeriod).backgroundColor}] })
      setActivityData({...activityData, datasets: [{...activityData.datasets[0], backgroundColor: getActivityData(tasksForPeriod, selectedPeriod).backgroundColor, borderColor: getActivityData(tasksForPeriod, selectedPeriod).borderColor }] })
      document.body.setAttribute("data-theme", localStorage.getItem("LF_theme") ? localStorage.getItem("LF_theme") : "light")
    }, [theme])

    useEffect(() => { // update user
      if (userData && userData._id) {
        localStorage.setItem("LF_userData", JSON.stringify(userData))
        Axios.put(`http://localhost:3001/updateUser/${userData._id}`, userData )
      }
    }, [userDataChanged])

  return (
    <>
      {!loggedIn && <Login loggedIn={setLoggedIn} userData={setUserData} />}
      {loggedIn && userData &&

        <div className={`home ${logoutAnimation ? "fade-out" : ""}`}>

          

          {newTaskWindow &&
            <AddTask>
              <div className={`new-task-overlay ${newTaskCloseAnim ? "fade-out" : ""}`}>
                <div className={`new-task-window ${newTaskCloseAnim ? "close-new-task-anim" : ""}`}>
                  <span className="close-new-task" onClick={handleCloseNewTask}>&#10006;</span>
                  <textarea onChange={(e) => setNewTask(e.target.value)} value={newTask} placeholder={placeHolderVal} maxLength="70" style={{textAlign: lang === "LF_ar" || lang === "LF_fa" ? "right" : "left"}}></textarea>
                  <div className="new-task-medals">
                    <div className="reward"><LangProvider location="reward"/></div>
                    <div className={`gold ${selectedMedal === "gold" ? "selected-medal" : ""}`} onClick={() => setSelectedMedal("gold")} style={{cursor: "pointer"}}></div>
                    <div className={`silver ${selectedMedal === "silver" ? "selected-medal" : ""}`} onClick={() => setSelectedMedal("silver")} style={{cursor: "pointer"}}></div>
                    <div className={`bronze ${selectedMedal === "bronze" ? "selected-medal" : ""}`} onClick={() => setSelectedMedal("bronze")} style={{cursor: "pointer"}}></div>
                  </div>
                  <ReactCalendar newTaskDue={setNewTaskDue} />
                  <button className="add-task-btn" onClick={() => { addNewTask(); handleCloseNewTask() }} disabled={!!!newTask.trim()}><SlNote /></button>
                </div>
              </div>
            </AddTask>}

          

          

          <div className={`sidebar ${sidebarCollapsed || logoutAnimation ? "collapsed" : ""}`}>
            <div className="collapse-sidebar"><FaBars onClick={() => setSidebarCollapsed(true)} /></div>
            <div className="username">{userData.username}</div>
            <Link className={`sidebar-section ${selectedSection === "tasks" ? "underline" : ""}`} name="tasks" to="/" onClick={underlineSelected}><FaTasks /><LangProvider location="tasks"/></Link>
            <Link className={`sidebar-section ${selectedSection === "statistics" ? "underline" : ""}`} name="statistics" to="/statistics" onClick={underlineSelected}><FaChartPie /><LangProvider location="stats"/></Link>
            <Link className={`sidebar-section ${selectedSection === "activity" ? "underline" : ""}`} name="activity" to="/activity" onClick={underlineSelected}><FaChartLine /><LangProvider location="activity"/></Link>
            <Link className={`sidebar-section ${selectedSection === "highlights" ? "underline" : ""}`} name="highlights" to="/highlights" onClick={underlineSelected}><FaMedal /><LangProvider location="highlights"/></Link>
            <Link className={`sidebar-section ${selectedSection === "settings" ? "underline" : ""}`} name="settings" to="/profile" onClick={underlineSelected}><FaUser /><LangProvider location="profile"/></Link>
            <Link className={`sidebar-section ${selectedSection === "faq" ? "underline" : ""}`} name="faq" to="/faq" onClick={underlineSelected}><FaQuestion />FAQ</Link>
            <div className="sidebar-section" onClick={logout}><SlLogout /><LangProvider location="logout"/></div>
          </div>

          <div className="main-content">

            <div className="open-sb-and-medals">
              <div className="open-sidebar"><FaBars onClick={() => setSidebarCollapsed(false)} /></div>

              <div className="new-task-small-screen" onClick={() => {setNewTaskWindow(true)}}>+</div>

              <div className="medals">
                <div className="medal-score">
                  <div className="gold"></div>
                  <span className="medal-count">{userData.medals.gold}</span>
                </div>

                <div className="medal-score">
                  <div className="silver"></div>
                  <span className="medal-count">{userData.medals.silver}</span>
                </div>

                <div className="medal-score">
                  <div className="bronze"></div>
                  <span className="medal-count">{userData.medals.bronze}</span>
                </div>

              </div>
            </div>
            <Routes>
              <Route path="/" element={<Tasks tasks={tasks} setTasks={setTasks} userData={userData} setUserData={setUserData} pastTasks={pastTasks} setPastTasks={setPastTasks} setTaskChecked={setTaskChecked} setTaskDone={setTaskDone} setUserDataChanged={setUserDataChanged} />} />
              <Route path="/statistics" element={<Statistics completionRateData={completionRateData} medalsData={medalsData} tasksForPeriod={pieChartTasks} medalsEarned={medalsEarned} />} />
              <Route path="/activity" element={<Activity chartData={activityData} />} />
              <Route path="/highlights" element={<Highlights highlights={tasksForPeriod.filter(task => (task.done && task.medal !== "bronze"))} />} />
              <Route path="/profile" element={<Profile userData={userData} setUserData={setUserData} />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>

            <div className="bottom-controls">
            {(selectedSection === "statistics" || selectedSection === "activity" || selectedSection === "highlights") && 
            <div className="searchPeriod">
              <div className="searchPeriod-input-wrapper">
                <input type="number" placeholder="7" onChange={setPeriod} value={searchPeriodVal} />
                <span><LangProvider location="day" searchPeriodVal={searchPeriodVal}/></span>
              </div>
              <button onClick={applyPeriod}><FaSearch /></button>
            </div>
          }

            {(selectedSection !== "statistics" && selectedSection !== "activity" && selectedSection !== "highlights") && 
            <div className="flexbox-placeholder"></div>}

            <div className="new-task" onClick={() => {setNewTaskWindow(true)}}>+</div>
            </div>

          </div>
        </div>
      }
    </>
  )
}