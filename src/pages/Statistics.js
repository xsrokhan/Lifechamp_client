import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { SlRefresh } from "react-icons/sl"
import { StatisticsLabelProvider } from '../LangProvider'

export const Statistics = ({completionRateData, medalsData, tasksForPeriod, medalsEarned}) => {
  const [front, setFront] = useState(true)
  const complete = StatisticsLabelProvider("complete")
  const incomplete = StatisticsLabelProvider("incomplete")
  const noTasks = StatisticsLabelProvider("no-tasks")
  const noMedals = StatisticsLabelProvider("no-medals")

  return (
    <div className="piechart-outer">
      <div className="piechart-and-btn-container">
        <div className={`piechart-container ${front ? "flip-to-front" : "flip-to-back"}`}>
          <div className="front">
            <Pie data={{...completionRateData, labels: tasksForPeriod.length ? [complete, incomplete] : [noTasks]}} />
          </div>
          <div className="back">
            <Pie data={{...medalsData, labels: tasksForPeriod.length && medalsEarned ? [""] : [noMedals]}} />
          </div>
        </div>
        <button onClick={() => setFront(!front)}><SlRefresh /></button>
      </div>
    </div>
  )
}


