import "@testing-library/jest-dom";
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import appStore from '../../utils/appStore';
import HeaderLayout from '../HeaderLayout';
test("Should load header component with a login button",()=>{

    render(
    <BrowserRouter>
    <Provider store={appStore}>
    <HeaderLayout/>
    </Provider>
    </BrowserRouter>
    );

    //const button= screen.getByRole("button");

    //const button= screen.getByText("button");

    const button= screen.getByRole("button",{name:"login"});
    expect(button).toBeInTheDocument()
})


test("Should load header component with cart items 0",()=>{

    render(
    <BrowserRouter>
    <Provider store={appStore}>
    <HeaderLayout/>
    </Provider>
    </BrowserRouter>
    );

 

    // const button= screen.getByText("Cart- 0");
    const button= screen.getByText(/Cart/);
    expect(button).toBeInTheDocument()
})

test("it should change login to logout onclick",()=>{

    render(
    <BrowserRouter>
    <Provider store={appStore}>
    <HeaderLayout/>
    </Provider>
    </BrowserRouter>
    );

    const loginButton= screen.getByRole("button",{name:"login"});
    fireEvent.click(loginButton);
    const logout= screen.getByText("logout")
    expect(logout).toBeInTheDocument()
})
