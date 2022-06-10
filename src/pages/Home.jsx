import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import qs from 'qs'

import PizzaBlock from '../componets/PizzaBlog'
import Skeleton from '../componets/PizzaBlog/Skeleton'
import Sort, { sortlist } from '../componets/Sort'
import Categories from '../componets/Categories'
import Pagination from '../componets/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'





export default function Home({searchValue}) {
  const navigate = useNavigate()
  const {categoryId, sort, currentPage}  = useSelector(state => state.filter)
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const dispatch = useDispatch()



  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = page =>{
    dispatch(setCurrentPage(page))
  }

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'; 
    const category =categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(
      `https://627e11c7b75a25d3f3b112d3.mockapi.io/carts?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false)
      })
  }

    useEffect(()=> {
      if(window.location.search){
        const params = qs.parse(window.location.search.substring(1))

        const sort = sortlist.find(obj => obj.sortProperty === params.sortProperty)
        
        dispatch(
          setFilters({
            ...params,
            sort,
          })
        )
        isSearch.current = true
      }
    },[])


  useEffect(() => {
   window.scrollTo(0, 0)
   if(!isSearch.current) {
     fetchPizzas();
   } isSearch.current = false;

  }, [categoryId, sort.sortProperty, searchValue , currentPage])

  useEffect(()=>{
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  
  },[categoryId, sort.sortProperty,  currentPage])

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  
  return (
    <>
    <div className="content__top">
      <Categories value={categoryId} onChangeCategory={(i)=>onChangeCategory(i)}  />
      <Sort  />
    </div>
    <h2 className="content__title">Все пиццы</h2>
    <div className="content__items">
      {
        isLoading ? skeletons : pizzas 
      }
    </div>
      <Pagination currentPage={ currentPage} onChangePage={onChangePage}/>
  </>
  )
}
