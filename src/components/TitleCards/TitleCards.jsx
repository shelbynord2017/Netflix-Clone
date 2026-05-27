import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGQ4MmE1YTgzMjQzNWFlNzk5ZmI4MTlmNjQxZDIxZCIsIm5iZiI6MTc3OTg0NjgxOS4xNjQsInN1YiI6IjZhMTY0ZWEzZDNkMWI4NmJiNGQ0N2I5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zlEewSIp3mSpFjg00t0dpcU31uJUL9oO9GB6fP0Td4s'
  }
  };


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY*2;
  }

  useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(data => {
      if (data.results) {
        setApiData(data.results);
      }
    })
    .catch(err => console.error("API Fetch Error:", err));

  // Keep a local reference for the cleanup function
  const currentCardsRef = cardsRef.current;
  
  if (currentCardsRef) {
    currentCardsRef.addEventListener('wheel', handleWheel);
  }
  // Cleanup listener on unmount
  return () => {
    if (currentCardsRef) {
      currentCardsRef.removeEventListener('wheel', handleWheel);
    }
  };
}, []); // Empty dependency array is fine here if options/handleWheel don't change


  return (
    <div className="titlecards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card__list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards