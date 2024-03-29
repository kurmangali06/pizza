import React from 'react'
import { Link } from 'react-router-dom'
import CartEmptyImg from '../assets/empty-cart.png'

export default function CartEmpty() {
  return (
    <div className="cart cart--empty" >
      <h2>Корзина пустая <span>😕</span></h2>
      <p>Вероятней всего, вы не заказывали ещё пиццу.<br/>
        Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
        <img src={CartEmptyImg} alt="Empty cart" />
      <Link className="button button--black" to="/"><span>Вернуться назад</span></Link>
      </div >
  )
}
