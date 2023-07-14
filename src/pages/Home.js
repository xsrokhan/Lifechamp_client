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
import { Routes, Route, Link, useLocation } from 'react-router-dom'
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
  pastTasks.forEach(task => task.done === "false" ? task.done = false : task.done) // temp measure for testing with manual db input
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1050  ? true : false)
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1050  ? true : false)
  const [searchPeriodVal, setSearchPeriodVal] = useState("")
  const [expiryCheckPerformed, setExpiryCheckPerformed] = useState(0)
  const location = useLocation().pathname

  // Task states
  const [tasks, setTasks] = useState(loggedIn && userData ? JSON.parse(JSON.stringify(userData.current)) : [])
  const [pastTasks, setPastTasks] = useState(loggedIn && userData ? JSON.parse(JSON.stringify(userData.past)) : [])
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

  // Highlights state
  const [highlights, setHighlights] = useState(tasksForPeriod)
  
  function expiryCheck() { 
    let oneDay = 86400000
    let currentTime = dayjs().valueOf()
    tasks.forEach(task => {
      if (currentTime > +task.due + oneDay) { // task.due (00:00) + oneDay = end of day
        task.expired = true
      }
    })
    let expiredTasks = tasks.filter(task => task.expired === true && !task.addedToPast)
    let expiredTasksArray = []
    expiredTasks.forEach(task => {
      let clone = {...task}
      delete clone.id
      delete clone.checked
      delete clone.expired
      delete clone.medal
      expiredTasksArray.push(clone)
    })
    if (expiredTasksArray.length) {
      setPastTasks([...pastTasks, ...expiredTasksArray])
      setTasksForPeriod(getTasksForPeriod([...pastTasks, ...expiredTasksArray], selectedPeriod))
      tasks.forEach(task => {if (task.expired) task.addedToPast = true})
      setUserData({...userData, current: [...tasks], past: [...userData.past, ...expiredTasksArray]})
      setTasks([...tasks])
      setUserDataChanged(prev => prev + 1)
    }
    setExpiryCheckPerformed(prev => prev + 1)
  }

  useEffect(() => { // check if there are expired tasks on login and input check
    if (loggedIn) {
      expiryCheck()
    }
  }, [taskChecked, loggedIn])

  useEffect(() => { 
    setTasksForPeriod(getTasksForPeriod(pastTasks, selectedPeriod))
  }, [pastTasks])

  useEffect(() => { // update charts after completing a task
    applyPeriod()
}, [taskDone])

  function logout() {
    setLogoutAnimation(true)
    let timer = setTimeout(() => {setLoggedIn(false); localStorage.clear(); setLogoutAnimation(false); sessionStorage.setItem("LF_selectedSection", "tasks"); setSelectedPeriod(7); setNewTaskDue(dayjs().valueOf())}, 400)
    return () => clearTimeout(timer)
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
    setHighlights(tasksForPeriod)
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

    useEffect(() => { // updates charts on login after expiry check
        applyPeriod()
    }, [expiryCheckPerformed])

    useEffect(() => { // reset charts to the default search period of the past 7 days
      if (!searchPeriodVal) {
        applyPeriod()
      }
    }, [searchPeriodVal])

    function setPeriod(e) {
      if (!e.target.value || e.target.value[0] === "0" || !Number(e.target.value)) {
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
      if (loggedIn && userData && userData._id) {
        localStorage.setItem("LF_userData", JSON.stringify(userData))
        Axios.get(`https://lifechampserver-production.up.railway.app/validID/${userData._id}`).then(res => Axios.put(`https://lifechampserver-production.up.railway.app/updateUser/${userData._id}`, userData )).catch(err => {setLoggedIn(false); localStorage.clear()})
      }
    }, [userDataChanged])

    useEffect(() => { // if userData doesn't exist, e.g. removed manually in localStorage
      if (loggedIn && !userData) {
        setLoggedIn(false)
        localStorage.clear()
      }
    }, [])

    useEffect(() => {
      const debouncedHandleResize = debounce(() => {
        if (window.innerWidth < 1050) {
          setSidebarCollapsed(true)
          setSmallScreen(true)
        } else {
          setSidebarCollapsed(false)
          setSmallScreen(false)
        }
      }, 500)
  
      window.addEventListener("resize", debouncedHandleResize);
  
      return () => { // cleaning up
        window.removeEventListener("resize", debouncedHandleResize);
      }
    })

  return (
    <>
      {!loggedIn && <Login loggedIn={setLoggedIn} setUserData={setUserData} setTasks={setTasks} setPastTasks={setPastTasks} />}
      {loggedIn && userData &&

        <div className={`home ${logoutAnimation ? "fade-out" : ""}`}>

          

          {newTaskWindow &&
            <AddTask>
              <div className={`new-task-overlay ${newTaskCloseAnim ? "fade-out" : ""}`}>
                <div className={`new-task-window ${newTaskCloseAnim ? "close-new-task-anim" : ""}`}>
                  <span className="close-new-task" onClick={handleCloseNewTask}>&#10006;&#xFE0E;</span>
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
            <Link className={`sidebar-section ${location === "/" ? "active" : ""}`} to="/" onClick={() => {if (smallScreen) setSidebarCollapsed(true)}}><FaTasks /><LangProvider location="tasks"/></Link>
            <Link className={`sidebar-section ${location === "/statistics" ? "active" : ""}`} to="/statistics" onClick={() => {if (smallScreen) setSidebarCollapsed(true)}}><FaChartPie /><LangProvider location="stats"/></Link>
            <Link className={`sidebar-section ${location === "/activity" ? "active" : ""}`} to="/activity" onClick={() => {if (smallScreen) setSidebarCollapsed(true)}}><FaChartLine /><LangProvider location="activity"/></Link>
            <Link className={`sidebar-section ${location === "/highlights" ? "active" : ""}`} to="/highlights" onClick={() => {if (smallScreen) setSidebarCollapsed(true)}}><FaMedal /><LangProvider location="highlights"/></Link>
            <Link className={`sidebar-section ${location === "/profile" ? "active" : ""}`} to="/profile" onClick={() => {if (smallScreen) setSidebarCollapsed(true)}}><FaUser /><LangProvider location="profile"/></Link>
            <Link className={`sidebar-section ${location === "/faq" ? "active" : ""}`} to="/faq" onClick={() => {if (smallScreen) setSidebarCollapsed(true)}}><FaQuestion />FAQ</Link>
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
              <Route path="/highlights" element={<Highlights highlights={highlights.filter(task => (task.done && task.medal !== "bronze"))} />} />
              <Route path="/profile" element={<Profile userData={userData} setUserData={setUserData} />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>

            <div className="bottom-controls">
            {(location === "/statistics" || location === "/activity" || location === "/highlights") && 
            <div className="searchPeriod">
              <div className="searchPeriod-input-wrapper">
                <input type="number" placeholder="7" onChange={setPeriod} value={searchPeriodVal} />
                <span><LangProvider location="day" searchPeriodVal={searchPeriodVal}/></span>
              </div>
              <button onClick={applyPeriod} disabled={!searchPeriodVal}><FaSearch /></button>
            </div>
          }

            {(location !== "/statistics" && location !== "/activity" && location !== "/highlights") && 
            <div className="flexbox-placeholder"></div>}

            <div className="new-task" onClick={() => {setNewTaskWindow(true)}}>+</div>
            </div>

          </div>
        </div>
      }
    </>
  )
}

function debounce(fn, delay) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, delay)
  }
}