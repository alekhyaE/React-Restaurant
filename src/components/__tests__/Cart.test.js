import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../utils/appStore";
import Cart from "../Cart";
import HeaderLayout from "../HeaderLayout";
import RestaurantMenu from '../RestaurantMenu';
import MOCK_DATA from '../mocks/mockRestaurantMenu.json';
global.fetch= jest.fn(() =>{
   return Promise.resolve({
        json:() => 
        {
            return Promise.resolve(MOCK_DATA)
        }
    })
})

test("Should render cart component",async()=>{
    await act(async () =>
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <HeaderLayout />
          <RestaurantMenu />
          <Cart />
        </Provider>
      </BrowserRouter>
    )
  );
    const accordionText= screen.getByText("Mandi (4)");
    fireEvent.click(accordionText);
    const itemListCount= screen.getAllByTestId("fooditems");
    expect(itemListCount.length).toBe(4);
    expect(screen.getByText("Cart- 0")).toBeInTheDocument()
    const addButton=screen.getAllByText("Add+");
    fireEvent.click(addButton[0]);
    let cart=screen.getByTestId("cart");
    expect(screen.getByText("Cart- 1")).toBeInTheDocument()
    fireEvent.click(addButton[1]);
    cart=screen.getByTestId("cart");
    expect(screen.getByText("Cart- 2")).toBeInTheDocument()
    let itemCount=screen.getByTestId("fooditems")
    expect(itemCount.length).toBe(6)


    const clearCart= screen.getByRole("button",{name:"Clear Cart"});
    fireEvent.click(clearCart)
    // cart=screen.getByTestId("cart");
    // fireEvent.click(cart);
     itemCount=screen.getByTestId("fooditems")
     expect(itemCount.length).toBe(4);
     expect(screen.getByText("Cart is empty!!Please add few items to the cart")).toBeInTheDocument()
})
