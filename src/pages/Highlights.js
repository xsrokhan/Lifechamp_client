import React, { useContext } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { motion, AnimatePresence } from 'framer-motion'
import { Context } from '../Context'
import { LangProvider } from '../LangProvider'
require('dayjs/locale/ar-sa')
dayjs.extend(localizedFormat)

export const Highlights = ({ highlights }) => {
  const { lang } = useContext(Context)

  function getDate(arg) {
    let dt = dayjs(+arg).locale(lang === "LF_en" ? "en" : "ar-sa").format("L")
    return dt + ""
  }

  return (
    <>
      <ul className="tasks-ul" style={{justifyContent: highlights.length ? "flex-start" : "center"}}>
      {highlights.length > 0 && <AnimatePresence>
        {highlights.map((task, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
            exit={{opacity: 0, transition: {type: "spring"}}}
          >
            <div>{task.task}</div>
            <div className={task.medal}></div>
            <div>{getDate(task.due)}</div>
          </motion.li>
        ))}
      </AnimatePresence>}
      {!highlights.length && <div className="no-tasks"><LangProvider location="no-hl"/></div>}
      </ul>
    </>
  )
}
