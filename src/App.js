import './App.css';
import Images from './Images';
import React,{ useState, useEffect } from 'react';
import {shuffle} from 'lodash';
import Confetti from 'react-confetti';

function App() {
  const [cards,setCards] = useState(shuffle([...Images,...Images]));
  const [clicks,setClicks] = useState(0);
  const [won,setWon] = useState(false);
  const [activeCards,setActiveCards] = useState([]);
  const [foundPairs,setFoundPairs] = useState([]);
  const [counter, setCounter] = useState(0);
  const [started,setStarted] = useState(false);

  useEffect(() => {
    const timer = started && !won && setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);},
    [counter,won,started]
  );

  function flipCard(index) {
    setStarted(true);
    if(won){
      setCards(shuffle([...Images,...Images]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
    }
    if(activeCards.length === 0)
      setActiveCards([index]);
    else if(activeCards.length === 1){
      const firstIndex = activeCards[0];
      const secondIndex = index;
      if(cards[firstIndex] === cards[secondIndex] && firstIndex !== secondIndex){
        // alert("you found a pair")
        if(foundPairs.length + 2 === cards.length){
          setWon(true);
        }
        setFoundPairs([...foundPairs,firstIndex,secondIndex]);
      }
      setActiveCards([...activeCards,index]);
    }
    else{
      setActiveCards([index]);
    }
    setClicks(clicks + 1);
  }
  return (
    <div>
      <div className='board'>
        {cards.map((card,index) => {
          const flippedToFront = (activeCards.indexOf(index) !== -1) || (foundPairs.indexOf(index) !== -1);
          return(
              <div className={'card-outer ' + (flippedToFront ? 'flipped' : '')} onClick={() => flipCard(index)}>
                <div className='card'>
                  <div className='front'>
                    <img src={card} alt=''></img>
                  </div>
                  <div className='back'></div>
                </div>
              </div>
            );
        })}
      </div>  
      <div className='stats'>
          {won && (<>Congrats! You won the game in {counter}s and {clicks} clicks!<Confetti></Confetti><br></br></>)}
          {!won && (<>Clicks : {clicks}/18 &nbsp;</>)}
          {!won && (<>Found Pairs : {foundPairs.length/2}/18 &nbsp;</>)}
          {!won && (<>Timer : {counter}</>)}
      </div>
    </div>
  );
}

export default App;
