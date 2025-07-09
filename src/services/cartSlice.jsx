import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) :[],
        cartTotalQuantity:0,
        cartTotalAmount:0
    },
    reducers:{
        addToCart:(state,action)=>{
            const itemIndex = state.cartItems.findIndex(item=>item.id===action.payload.id)
            if(itemIndex>=0){//item at 0 index
                state.cartItems[itemIndex].cartQuantity +=1
            }else{
                const tempProduct={...action.payload,cartQuantity:1}
                state.cartItems.push(tempProduct)
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        removeFromCart:(state,action)=>{
            const nextCartItem=state.cartItems.filter(item=>//returns array containing items except action.payload items being clicked from cart
                item.id!==action.payload.id
            )
            state.cartItems=nextCartItem//updated []
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        decreaseCartItems:(state,action)=>{
            const itemIndex=state.cartItems.findIndex(item=>item.id===action.payload.id)
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity -=1
            }else if(state.cartItems[itemIndex].cartQuantity===1){
                const nextCartItem=state.cartItems.filter(item=>
                item.id!==action.payload.id
            )
            state.cartItems=nextCartItem
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        getTotalAmount:(state,action)=>{
            let {total,quantity} = state.cartItems.reduce((cartTotal,cartItem)=>{
                const {price,cartQuantity} = cartItem
                const totalprice=price*cartQuantity
                cartTotal.total +=totalprice
                cartTotal.quantity +=cartQuantity  
                return cartTotal;
            },{
                total:0,
                quantity:0
            });
            state.cartTotalAmount=total
            state.cartTotalQuantity=quantity
        }
    }
})
export const {addToCart,removeFromCart,decreaseCartItems,getTotalAmount} = cartSlice.actions
export default cartSlice.reducer