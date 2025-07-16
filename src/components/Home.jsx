import { useDispatch, useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../services/productApi'
import { addToCart } from '../services/cartSlice'
import { setSearchTerm } from '../services/searchSlice'

const Home = () => {
    const dispatch=useDispatch()
    const searchTerm=useSelector((state)=>state.search.searchTerm)
    const {data,isLoading,isError} = useGetAllProductsQuery()
    if(isLoading) return <div className='loading-container'>Loading...</div>
    if(isError) return <div className='error-container'>Something went wrong...</div>
  return (
    <>
    <div className="search-container">
      <input type="text"
    placeholder='search product'
    value={searchTerm}
    onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
    />
    </div>
    <div className="product-container">
      {
        data.products.filter(prods=>prods.title.toLowerCase().includes(searchTerm.toLowerCase())).map((item)=>(
            <div className="product-wrapper" key={item.id}>
                <img src={item.images[0]} alt={item.title} />
                <p>{item.title}</p>
                <p>${item.price}/-</p>
                <button className='btn' onClick={()=>dispatch(addToCart(item))} >Add to cart</button>
            </div>
        ))
      }
      </div>
    </>
  )
}

export default Home
