import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';





const TitleCards = ({ title, category }) => {

  const [apiData,setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTJmMGQ4YjhiZGQ1OWFjNGE4OTQ4Njc0ZjgyM2ZjYiIsIm5iZiI6MTczMDI5OTE3NS41OTkzNjAyLCJzdWIiOiI2NzIyNDEwNDk5MWVkYjAzNWM1ZjczNmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._c_xRaAfzVaoSY8ouFaNadVM9AlH9Z6hZX9BLY3MXQ8'
    }
  };




  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;

  }


  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('Wheel', handleWheel)

  }, [])


  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
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