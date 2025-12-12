import { useEffect, useState } from 'react';
import { MENU_URL } from "../utils/constants";
 const useRestaurantMenu = (resId) =>{
      const [resInfo, setResInfo] = useState(null);
    useEffect(()=>{
        fetchMenu();
        
    },[]);

    const fetchMenu = async()=>{
        const data= await fetch(MENU_URL+resId)
        const jsonData= await data.json();
        setResInfo(jsonData.data);
        // console.log(jsonData.data)
        // console.log("fetchMenu ---" +resInfo?.cards[2])
        
      
        
    }
    return resInfo;
}

export default useRestaurantMenu;
