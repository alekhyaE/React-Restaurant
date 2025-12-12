import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import { LOGO_URL } from '../utils/constants';
import useOnlineStatus from '../utils/useOnlineStatus';
//header

export const HeaderLayout = () =>{
    const [AuthBtn,setAuthBtn] = useState("login");
    const userContext = useContext(UserContext);
    const cartItems= useSelector((store)=>store.cart.items);

    const online= useOnlineStatus();
    return (
        <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
            <div className="w-56">
                <img className="logo" src={LOGO_URL}/>
            </div>
            <div className="nav-items flex items-center">
                <ul className="flex p-4 m-5">
                    <li className="px-4">
                        <Link to="/grocery">Grocery here!</Link>
                    </li>
                    <li className="px-4"><Link to='/'>Home
                        </Link></li>
                    <li className="px-4">
                        <Link to='/about'>About Us
                        </Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact US</Link>
                    </li>
                    <li data-testid="cart" className="px-4">
                    <Link to="/cart">Cart- {cartItems.length}</Link>
                        </li>
                    <li className="px-4">Online Status: {online?"💚":"❤️"}</li>
                    
                    <button className='login' onClick={()=>{
                       AuthBtn=='login'? setAuthBtn('logout'):setAuthBtn('login');
                    }}>{AuthBtn}</button>
                    <li className="px-4 font-bold">{userContext.loggedInUser}</li>
                </ul>
            </div>
        </div>

    )
};

export default HeaderLayout;
