import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from '../mocks/resCard.json';
test("Should render restaurant card",()=>{

    render(
    
    <RestaurantCard resData={MOCK_DATA}/>
   
    );
    const hotelName= screen.getByText("Donne Biryani House");
    expect(hotelName).toBeInTheDocument()
})

test("Should render restaurant card with Promoted Label",()=>{
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
    render(

        <RestaurantCardPromoted  resData={MOCK_DATA}/>
   
    );
    const hotelName= screen.getByText("Promoted");
    expect(hotelName).toBeInTheDocument()
})
