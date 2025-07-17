import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotalAmount } from '../services/cartSlice'

const Navbar = () => {
  const cart=useSelector((state)=>state.cart)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getTotalAmount())
  },[cart,dispatch])
  return (
    <div className='nav-container'>
      <ul>
        <li><Link to="/"><button>eShop</button></Link></li>
        <li><Link to="/cart">cart</Link>  (<span>{cart.cartTotalQuantity}</span>)</li>
      </ul>
    </div>
  )
}

export default Navbar
