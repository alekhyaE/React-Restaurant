import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/cartSlice';
import ItemList from './ItemList';
const Cart =() =>{
    const cartItems= useSelector((store)=>store.cart.items);
    const dispatch=useDispatch();
    
    handleClearCart = ()=>{
        // console.log(current(cartItems))
        dispatch(clearCart());
    }
    return(
        <div className="text-center m-4 p-4">
            <div className="w-6/12 m-auto">
                <h1 className='text-2xl font-bold'>Cart</h1>
                <button
                    className="p-2 m-2 bg-black text-white rounded-lg"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>
                {cartItems.length==0 && <h4>Cart is empty!!Please add few items to the cart</h4>}
                <ItemList items= {cartItems}/>
            </div>
        </div>
    )
}
export default Cart;
