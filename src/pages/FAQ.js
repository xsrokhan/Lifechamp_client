import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FAQProvider } from '../LangProvider'

export const FAQ = () => {
  const [state, setState] = useState({
    "1": true,
    "2": true,
    "3": true,
    "4": true
  })

  function handleState(e) {
    const selected = e.target.className.slice(-1)
    let clone = {...state}
    for (let key in clone) {
      if (key !== selected) {
        clone[key] = true
      } else {
        clone[key] = !clone[key]
      }
    }
    setState(clone)
  }
  
  let question1 = FAQProvider("life-champ-q")
  let answer1 = FAQProvider("life-champ-a")

  let question2 = FAQProvider("keep-track-q")
  let answer2 = FAQProvider("keep-track-a")

  let question3 = FAQProvider("medals-q")
  let answer3 = FAQProvider("medals-a")

  let question4 = FAQProvider("task-q")
  let answer4 = FAQProvider("task-a")

  const faq = [
    {
      question: question1,
      answer: answer1
    },
    {
      question: question2,
      answer: answer2
    },
    {
      question: question3,
      answer: answer3
    },
    {
      question: question4,
      answer: answer4
    }
  ]
  
  return (
    <div className="faq-outer-container">
      <div className="faq-container">
        {faq.map((a, i) => (
          <motion.div className="question-container" 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: i * 0.2 }}
          >
            <div className={`question ${i + 1 + ""}`} onClick={handleState}>{a.question}</div>
            <div className="answer-container" aria-hidden={state[i + 1 + ""]}>
              <div>{a.answer}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
