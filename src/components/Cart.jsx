import { useDispatch, useSelector } from "react-redux"
import { addToCart, decreaseCartItems, getTotalAmount, removeFromCart } from "../services/cartSlice"
import { Link } from "react-router-dom"
import { useEffect } from "react"


const Cart = () => {
  const dispatch=useDispatch()
  const cart = useSelector((state)=>state.cart)
  useEffect(()=>{
    dispatch(getTotalAmount())
  },[cart,dispatch])
  return (
    <>
      {
        cart.cartItems.length===0?<div className="no-product-container" >Your cart is empty...
        <Link to="/"><button>Continue Shopping</button></Link>
        </div>:(
        <div className="cart=product-container" >
          {
            cart.cartItems.map((item)=>(
              <div key={item.id} className="cart-product-wrapper">
                <img src={item.images[0]} alt={item.title} />
                <button onClick={()=>dispatch(removeFromCart(item))} >Remove</button>
                <p className="p-title" >{item.title}</p>
                <p className="p-price" >${item.price.toFixed(2)}/-</p>
                  <div className="btn">
                    <button onClick={()=>dispatch(decreaseCartItems(item))} >-</button> 
                  {item.cartQuantity}
                  <button onClick={()=>dispatch(addToCart(item))} >+</button>
                  </div>
                <p className="p-total" >${(item.price * item.cartQuantity).toFixed(2)}/-</p>
              </div>
            ))
          }
          <hr />
          <div className="sub-total" >SubTotal : ${cart.cartTotalAmount.toFixed(2)}</div>
        </div>)
      }
    </>
  )
}

export default Cart
