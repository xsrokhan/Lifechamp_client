import React, { useState, useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { Context } from '../Context'
import { useEffect } from 'react'
import { ActivityLabelProvider } from '../LangProvider'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
require('dayjs/locale/ar-sa')
dayjs.extend(localizedFormat)


export const Activity = ({chartData}) => {
  const { theme, lang } = useContext(Context)

  const [options, setOptions] = useState({
    scales: {
      x: {
          display: false
      },
      y: {
        ticks: {
            precision: 0,
            color: "#393532"
        },
        grid: {
          color: "#dbd7d2",
        },
        border: {
          color: "#dbd7d2"
        },
        beginAtZero: true
    }
  },
    plugins: {
      tooltip: {
        displayColors: false 
      }
    }
  })

  useEffect(() => {
    if (theme === "light") {
      setOptions({...options, scales: {...options.scales, y: {...options.scales.y, ticks: {...options.scales.y.ticks, color: "#393532"}, grid: {...options.scales.y.grid, color: "#dbd7d2"}, border: {...options.scales.y.border, color: "#dbd7d2"} } }})
    } else {
      setOptions({...options, scales: {...options.scales, y: {...options.scales.y, ticks: {...options.scales.y.ticks, color: "#E4E6eB"}, grid: {...options.scales.y.grid, color: "#E4E6eB"}, border: {...options.scales.y.border, color: "#E4E6eB"} } }})
    }
  }, [theme])

  return (
    <div className="linechart-outer">
      <div className="linechart-container">
        <Line data={{...chartData, labels: [...chartData.labels.map(date => "" + dayjs(date).locale(lang === "LF_en" ? "en" : "ar-sa").format("L")), ActivityLabelProvider()]}} options={options} />
      </div>
    </div>
  )
}


