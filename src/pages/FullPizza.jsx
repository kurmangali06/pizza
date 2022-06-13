import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
import './FullPizza.scss'

export default function FullPizza() {
  const [pizza, setPizza ] = useState()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(()=> {
    async function fetchPizza() { 
      try {
        const {data} = await axios.get('https://627e11c7b75a25d3f3b112d3.mockapi.io/carts/' + id)
        setPizza(data)
      }
      catch(error) {
        alert('ошибка при получений пиццы')
        navigate('/')
      }
  }
  fetchPizza()
  }, [])


  if(!pizza) {
    return "загрузка...";
  }

  return (
    <div className='container full-pizza'>
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}
