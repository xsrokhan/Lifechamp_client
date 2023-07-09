import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import './styles/Calendar.css'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Context } from './Context';
dayjs.extend(localizedFormat)

export function ReactCalendar({newTaskDue}) {
  const [value, onChange] = useState(dayjs().format());
  const { lang } = useContext(Context)

  function getLocale() {
    switch (lang) {
      case "LF_ru":
        return "ru";
      case "LF_az":
        return "tr";
      case "LF_fa":
        return "fa";
      case "LF_tr":
        return "tr";
      case "LF_sp":
        return "es";
      case "LF_fa":
        return "en";
      case "LF_fr":
        return "fr";
      case "LF_ar":
        return "ar";
      case "LF_it":
        return "it";
      case "LF_ch":
        return "zh";
      default:
        return "en"
    }
  }

  return (
    <div>
      <Calendar
      locale={getLocale()} 
      onChange={onChange} 
      value={value} 
      minDate={new Date(dayjs().valueOf())} 
      onClickDay={day => newTaskDue(dayjs(day).valueOf())}
      tileClassName={({ activeStartDate, date, view }) => {
        let currentVal = typeof value === "string" ? 
        new Date(value.split('T')[0]).toISOString().split('T')[0] : // initial value
        new Date(dayjs(value).format().split('T')[0]).toISOString().split('T')[0]
        if (
          date.toISOString().split('T')[0] === currentVal
        )
          return 'react-calendar__tile_selected'
      }}
      />
    </div>
  );
}