import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/UserContext';
import useOnlineStatus from '../utils/useOnlineStatus';
import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import Shimmer from './Shimmer';
const Body = () =>{
    const {loggedInUser, setUserName} = useContext(UserContext);
    //Creating state var
    const [listOfRestaurants, setListOfRestaurants] = useState(
     []
    );
    const [filteredRestaurants, setFilteredRestaurants] = useState(
        []
       );
    //eq to let listOfRestaurants;

    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)

    useEffect(()=>{
        //Initially, we show dummy data
        //Once the comp is rendered, we make API call
        //then rerender
        fetchData();
    },[]);

    const fetchData= async()=>{
        //https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING
        //intial link- 
        const data= await fetch("https://www.swiggy.com/dapi/restaurants/search/v3?lat=12.9351929&lng=77.62448069999999&str=Biryan&trackingId=65c82a60-19f9-c69e-3a61-1edf4992307f&submitAction=ENTER&queryUniqueId=c97f1c63-8083-956d-342c-f957a081af25");
        const jsonData= await data.json();

        
        //Optional chaining
        setListOfRestaurants(jsonData?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants);
        setFilteredRestaurants(jsonData?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants);
    }
    const online= useOnlineStatus();
//    console.log(online)

    if(online==false){
        return (<h1>Looks like you are offline</h1>)
       }
    if(listOfRestaurants.length==0){
        return <Shimmer/>
    }
    
   
    return listOfRestaurants.length==0? (<Shimmer/>): (
    <div className='body'>
        
        <div className="filter flex">
        <div className="search p-4 m-4">
                <input type="text" className="search-box border border-solid border-black"  data-testid="searchInput" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>
                <button className="px-4 py-2 bg-green-100 m-4 rounded-xl" onClick= {()=>{
                    // console.log(searchText);
                    const filteredRestaurants= listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                    // console.log(filteredRestaurants)
                    setFilteredRestaurants(filteredRestaurants);

                }}>Search</button>
        </div>
        <div className="search p-4 m-4 flex items-center">
            <button data-testid="top-rated" className="filter-button bg-green-100" 
            onClick= {() =>{
                
                // console.log('Button clicked');
                const filteredList = listOfRestaurants.filter((res)=>{
                    return res.info.avgRating>4.5
                })
                setFilteredRestaurants(filteredList)
            }}
            
            >
            Top Rated Restaurants
            </button>
            </div>
            </div>
            <div className="search p-4 m-4 flex items-center">
                <input className='border border-black p-2' value={loggedInUser} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
         <div className="res-container flex flex-wrap">
            {
              filteredRestaurants.map((restaurant)=>(
               <Link key={restaurant.info.id} to={"restaurant/"+ restaurant.info.id}>  
                {restaurant.info.avgRating>4?
                (<RestaurantCardPromoted key={restaurant.info.id} resData={restaurant}/>): (<RestaurantCard key={restaurant.info.id} resData={restaurant}/>)}
                </Link>
              ))
            }
         </div>
    </div>
    )
   
 }
export default Body;
