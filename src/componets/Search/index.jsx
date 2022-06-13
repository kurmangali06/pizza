import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import depounce from 'lodash.debounce'

import style from "./Search.module.scss"
import { useDispatch } from 'react-redux'
import { setSearhValue } from '../../redux/slices/filterSlice'

export default function Search() {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const [value, setValue ]= useState('')

  const onClickClear = () => {
    dispatch(setSearhValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const updateSearhValue = useCallback(
    depounce((str) => {
      dispatch(setSearhValue(str))
    }, 500),
    []
  )

  const onChangeInput = event => {
    setValue(event.target.value)
    updateSearhValue(event.target.value)
  }
  return (
    <div className={style.root}>
      <img className={style.icon} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/System-search.svg/1200px-System-search.svg.png'/>
      <input ref={inputRef} className={style.input} placeholder='Поиск пиццы...' value={value} onChange={ onChangeInput }/>
      {value && (<img onClick={onClickClear} className={style.clearIcon} src='https://i.ya-webdesign.com/images/oyster-clipart-watercolor-18.png'/>)}
    </div>
    
  )
}
