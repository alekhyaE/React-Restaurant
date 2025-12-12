

import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './components/About';
import Body from './components/Body';
import Cart from './components/Cart';
import Contact from './components/Contact';
import Error from './components/Error';
import HeaderLayout from './components/HeaderLayout';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './utils/UserContext';
import appStore from './utils/appStore';
const Grocery= lazy(()=>import('./components/Grocery'));

const AppLayout = () =>{
   
    const [userName, setUserName]= useState();
    useEffect(()=>{
        //Make API call
        const data={name:"Alekhya.E"}
        setUserName(data.name)
    },[])

    return (
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
        <div className="app">
            {/* Value-Kavya will be applicable for Header layout */}
        {/* <UserContext.Provider value={{loggedInUser:"Kavya.E"}}> */}
            <HeaderLayout/>
        {/* </UserContext.Provider>     */}
            <Outlet/>
        </div>
        </UserContext.Provider>
        </Provider>
    )
}
const appRouter= createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path:'/',
                element:<Body/>
            },
            {
                path:'about',
                element:<About/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
            {
                path:'/grocery',
                element:<Suspense fallback={<h1>Fetching data</h1>}><Grocery/></Suspense>
            },
            {
                path:'restaurant/:resId',
                element:<RestaurantMenu/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
        
        ]
    },
    
])
const root= ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);

