import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockRestaurantList.json";
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should Search Res List for Hyderabad text input ", async () => {
  await act(async () =>
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    )
  )
//   const searchBtn = screen.getByRole("button", { name: "Search" });

   const searchBtn= screen.getByRole("button",{name:"Search"})
   let resCard= screen.getAllByTestId("resCard");
   expect(resCard.length).toBe(80)
   const searchInput=screen.getByTestId("searchInput");
   fireEvent.change(searchInput,{target:{value:"Hyderabad"}})

   fireEvent.click(searchBtn);
   resCard= screen.getAllByTestId("resCard");
    expect(resCard.length).toBe(2)
});


it("Should give Top Rated Restaurants", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Body />
        </BrowserRouter>
      )
    )
  
  
     const topRatedBtn= screen.getByRole("button",{name:"Top Rated Restaurants"})
     let cardsBeforeFilter= screen.getAllByTestId("resCard");
    expect(cardsBeforeFilter.length).toBe(80)
    
     fireEvent.click(topRatedBtn)
  
   
     let cardsAfterFilter= screen.getAllByTestId("resCard");
     
      expect(cardsAfterFilter.length).toBe(6)
  });
