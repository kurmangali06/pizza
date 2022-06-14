import React from 'react'

import styles from './NotFoundBlock.module.scss'



 const NotFoundBlock:React.FC = () => {
  return (
    <div className={styles.root}>
      <h1> 
        <span>😕</span>
        <br/>
         Ничего не найдено </h1>
         <p className={styles.desription}>Вероятней всего, вы не заказывали ещё пиццу.
          Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
    </div>
   
  )
}
export default NotFoundBlock
