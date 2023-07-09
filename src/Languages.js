import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { Context } from './Context'
import en from './flags/en.png'
import az from './flags/az.png'
import ru from './flags/ru.png'
import ar from './flags/ar.png'
import fa from './flags/fa.png'
import fr from './flags/fr.png'
import sp from './flags/sp.png'
import it from './flags/it.png'
import ch from './flags/ch.png'
import tr from './flags/tr.png'

const langs = [
  {
    flag: az,
    name: "az",
    id: 1
  },
  {
    flag: ru,
    name: "ru",
    id: 2
  },
  {
    flag: ar,
    name: "ar",
    id: 3
  },
  {
    flag: tr,
    name: "tr",
    id: 4
  },
  {
    flag: sp,
    name: "sp",
    id: 5
  },
  {
    flag: fr,
    name: "fr",
    id: 6
  },
  {
    flag: ch,
    name: "ch",
    id: 7
  },
  {
    flag: fa,
    name: "fa",
    id: 8
  },
  {
    flag: it,
    name: "it",
    id: 9
  },
  {
    flag: en,
    name: "en",
    id: 10
  }
]

export const Languages = () => {
  const { lang, changeLang } = useContext(Context)
    const [flags, setFlags] = useState(setFlagsFunc())
    const [popout, setPopout] = useState(false)
    const [clicked, setClicked] = useState(false)

    function setFlagsFunc() {
      let selected = langs.find(l => l.name === lang.slice(-2))
      let filtered = langs.filter(l => l.name !== lang.slice(-2))
      console.log(selected)
      return [...filtered, selected]
    }
  
    function setPop() {
      if (!clicked) {
        return ""
      }
      if (popout) {
        return "popout"
      } else {
        return "popaway"
      }
    }
  
    function setState() {
      setClicked(true)
      setPopout(!popout)
    }
    
    function shuffle(e) {
      let selectedLang = e.target.alt
      changeLang(selectedLang)
      const newLangs = langs.filter(lang => lang.name !== selectedLang)
      selectedLang = langs.find(lang => lang.name === selectedLang)
      newLangs.push(selectedLang)
      setFlags([...newLangs])
    }
  
    return (
      <>
        <ul className="grid">
            {
              flags.map((a, i) => (
                <motion.li className="card"
                  key={a.id}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { type: "spring" }
                  }}
                  layout
                >
                  <img src={a.flag} alt={a.name} className={`${i !== 9 ? "hidden" : ""} ${i !== 9 && setPop()} `} 
                  onClick={function (e) { return i === 9 ? setState() : shuffle(e) }} 
                  />
                </motion.li>
              ))
            }
            <i className={`fa-solid fa-caret-down ${popout ? 'arrowUp' : ''}`} onClick={setState}></i>
        </ul>
      </>
    );
}
