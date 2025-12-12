import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from './Shimmer';
export const RestaurantMenu = () =>{
    const dummyData="dummy"
    const [showIndex, setShowIndex] = useState(null);
    
    // useEffect(()=>{
    //     fetchMenu();
    //     console.log("useEffect");

    //     //Component Unmounting
    //     return () =>{
    //         console.log("unmounting here")
    //     }
    // },[]);

    // console.log("rendering outside")
    // const [resInfo, setResInfo] = useState(null);
  
    const {resId} = useParams();

    //Custom hooks
    const resInfo = useRestaurantMenu(resId)
    // console.log(resInfo)
    // console.log(resId)
    // const fetchMenu = async()=>{
    //     const data= await fetch(MENU_URL+resId)
    //     const jsonData= await data.json();
    //     // console.log(jsonData);
    //     setResInfo(jsonData.data);
        
    // }
    if(resInfo==null) {
        return <Shimmer/>
    }
    const {name,cuisines,costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;
    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    // console.log(itemCards);

    const categories=resInfo?.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter((res)=>
        res.card.card['@type']==='type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
            
    );
    // console.log(categories)

    return  (
        <div className="menu text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")}- {costForTwoMessage}</p>
            
            <h2>Menu</h2>
            {categories.map((category, index) => (
        // controlled component
        <RestaurantCategory showItems={index==showIndex?true:false} data={category.card.card} setShowIndex={()=>index==showIndex?setShowIndex(null):setShowIndex(index)} dummyData={dummyData}/>
      ))}
        </div>
    )
}

export default RestaurantMenu;
