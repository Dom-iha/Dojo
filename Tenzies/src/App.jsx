import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

import './styles/App.css'
import Die from './components/Die'


function App () {

   const [dice, setDice] = useState(allNewDice())
   const [tenzies, setTenzies] = useState(false)
   
   useEffect(() => {
       const firstValue = dice[0].value
      //  .every() checks for a specific condition,  and if every 
      // item in the array is  true to the condition it will return true
       const allHeld = dice.every(die => die.held)
       const allSameNumber = dice.every(die => die.value === firstValue)
       if(allHeld && allSameNumber) {
           setTenzies(true)
       }
   }, [dice])
   
   function randomDieValue() {
       return Math.ceil(Math.random() * 6)
   }

   function allNewDice() {
       const newArray = []
       for(let i = 0; i < 10; i++) {
           const newDie = {
               value: randomDieValue(),
               held: false,
               id: i + 1
           }
           newArray.push(newDie)
       }
       return newArray
   }

   function rollUnheldDice() {
       if (!tenzies) {
           setDice((oldDice) => oldDice.map((die, i) =>
               die.held ? 
                  die : 
                  {value: randomDieValue(), held: false, id: i + 1 }
           ))
       } else {
           setDice(allNewDice())
           setTenzies(false)
       }
   }

   function holdDice(id) {
       setDice(prevDice => prevDice.map(die => {
           return die.id === id ? 
               {...die, held: !die.held} : 
               die
       }))
   }

   const diceElements = dice.map((die) => (
       <Die key={die.id} {...die} hold={() => holdDice(die.id)} />
   ))
  return (
     <main>  
         {tenzies && <Confetti />}
         <h1>Tenzies</h1>
         <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
         <div className="die-container">{diceElements}</div>
         <button className="roll-dice" onClick={rollUnheldDice}>
               {tenzies ? "Reset Game" : "Roll"}
         </button>
     </main>
   )
}
   
export default App