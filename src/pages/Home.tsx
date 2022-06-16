import React, { useCallback, useRef } from 'react'
import { useEffect } from 'react'
import qs from 'qs'

import PizzaBlock from '../componets/PizzaBlog'
import Skeleton from '../componets/PizzaBlog/Skeleton'
import  { sortlist } from '../componets/Sort'
import Categories from '../componets/Categories'
import Pagination from '../componets/Pagination'
import {  useSelector } from 'react-redux'
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import {  useNavigate } from 'react-router-dom'
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice'
import { useAppDispatch } from '../redux/store'
import SortPup from '../componets/Sort'





 const Home:React.FC = () => {
  const navigate = useNavigate()
  const {categoryId, sort, currentPage, searchValue}  = useSelector(selectFilter)
  const {items, status}  = useSelector(selectPizzaData)
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  const dispatch = useAppDispatch()


  

  const onChangeCategory =  useCallback((id: number) => {
  dispatch(setCategoryId(id))
}, [])
  

  const onChangePage = (page:number) =>{
    dispatch(setCurrentPage(page))
  }

  const getPizzas =  async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'; 
    const category =categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : ''; 

        dispatch(
          fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(currentPage)
        }))
        window.scrollTo(0, 0)
  }  

    useEffect(()=> {
      if(window.location.search){
        const params = (qs.parse(window.location.search.substring(1))as unknown) as SearchPizzaParams

        const sort = sortlist.find(obj => obj.sortProperty === params.sortBy)
        
        dispatch(
          setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sort : sort ? sort : sortlist[0]
          })
        )
        isSearch.current = true
      }
    },[])


  useEffect(() => {
 
   if(!isSearch.current) {
     getPizzas();
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

  const pizzas = items.map((obj:any) => <PizzaBlock   key={obj.id} {...obj} /> );
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)
  
  return (
    <>
    <div className="content__top">
      <Categories value={categoryId} onChangeCategory={onChangeCategory}  />
      <SortPup value={sort} />
    </div>
    <h2 className="content__title">Все пиццы</h2>
    {
      status === 'error' ? 
      <div className='content__error-info'>
        <h2>Произошла ошибка 😕</h2>
        <p>К сожелению, не удалось получить пиццы. Попробуйте повтроить попытку  позже</p>
      </div>
    :
    <div className="content__items">
      {
        status === 'loading' ? skeletons : pizzas 
      }
    </div>}
      <Pagination currentPage={ currentPage} onChangePage={onChangePage}/>
  </>
  )
}



export default Home