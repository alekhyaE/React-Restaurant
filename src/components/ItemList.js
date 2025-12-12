
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
const ItemList = (props) =>{
    // console.log(props.items);
//    console.log(props.dummyData)
   const dispatch=useDispatch()
    const handleAdd=(item)=>{
        dispatch(addItem(item))
    }


    return (
        <div>
            {props.items.map((item)=>(
                <div data-testid="fooditems" key ={item.card.info.id} className="p-2 m-2  border-gray-200 border-b-2 text-left flex justify-between">
                   
                    <div className='w-9/12'>
                    <div className="py-2">
                        <span>{item.card.info.name} </span>
                        <span> - ₹({item.card.info.price/100})</span>
                    </div>
                    
                    <p className="text-xs font-normal">{item.card.info.description}</p>
                    </div>
                    <div className='p-4 w-3/12'>
                    <div className='absolute'>
                    <button className='p-2 mx-16 rounded-lg  bg-black text-white shadow-lg' onClick={()=>handleAdd(item)}>Add+</button>
                    </div>
                     <img className ="res-logo w-full" src={CDN_URL +item.card.info.imageId} alt="res-logo"></img>
                     
                     </div>
                </div>
        ))}
        </div>
    )
}

export default ItemList;
