import ItemList from "./ItemList";

const RestaurantCategory = (props) => {
    const handleClick= (e) =>{
        // console.log("header clicked");
        props.setShowIndex()
    }
    
  return (
    // acc header
    <div className="w-6/12 bg-gray-50 shadow-lg p-4 mx-auto my-4  font-bold text-lg" onClick={handleClick}>
    <div className="flex justify-between cursor-pointer">
      <span>{props.data.title}  ({props.data.itemCards.length})</span>
      <span>⬇️</span>
      </div>
      {/* acc body */}
      {props.showItems && <ItemList items= {props.data.itemCards} dummyData={props.dummyData}/>}
    </div>

    
    
  );
};

export default RestaurantCategory;
