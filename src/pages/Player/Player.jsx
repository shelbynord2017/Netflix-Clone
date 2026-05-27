import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGQ4MmE1YTgzMjQzNWFlNzk5ZmI4MTlmNjQxZDIxZCIsIm5iZiI6MTc3OTg0NjgxOS4xNjQsInN1YiI6IjZhMTY0ZWEzZDNkMWI4NmJiNGQ0N2I5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zlEewSIp3mSpFjg00t0dpcU31uJUL9oO9GB6fP0Td4s'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(data => {
      if (data.results[0]) {
        setApiData(data.results[0]);
      }
    })
    .catch(err => console.error("API Fetch Error:", err));
  }, [])

  


  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-1)}}/>
      <iframe width='90%' height='90%' src={`https://youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player__info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player