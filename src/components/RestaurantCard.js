import { useContext } from 'react';
import UserContext from '../utils/UserContext';
import { CDN_URL } from '../utils/constants';
const styleCard = {
    backgroundColor : "#f0f0f0"
}

const RestaurantCard = (props) =>{
    const userContext = useContext(UserContext);
    const {resData} = props;
    console.log(resData)
    const {name,cuisines,avgRating,sla,cloudinaryImageId}= resData.info;
    // console.log(resData);
    return (
        <div data-testid="resCard" className='res-card m-4 p-4 w-[250px] rounded-lg bg-gray-150 hover:bg-gray-200' >
           
            <img className ="res-logo rounded-lg" src={CDN_URL +cloudinaryImageId} alt="res-logo"></img>
            <h3 className='font-bold py-4 text-lg'>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{sla.slaString}</h4>
            <h4>{userContext.loggedInUser}</h4>
        </div>
    )
}

//Higher Order Component
//Input -> RestaurantCard => RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) =>{
    return (props) =>{
        return (
            <div>
                <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>Promoted</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
} 
export default RestaurantCard;
