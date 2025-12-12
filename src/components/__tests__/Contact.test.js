import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Contact from '../Contact';

describe("Contact US page",()=>{
    it("Contact page should load fine",()=>{
        render(<Contact/>);
        const heading=screen.getByRole("heading");
        expect(heading).toBeInTheDocument()
    })
    
    it("Should load button inside Contact component",()=>{
        render(<Contact/>);
        const button=screen.getByRole("button");
        expect(button).toBeInTheDocument()
    })
    
    it("Should load input name inside Contact component",()=>{
        render(<Contact/>);
        const placeholder=screen.getByPlaceholderText("name");
        expect(placeholder).toBeInTheDocument()
    })
    
    it("Should load two input boxes inside Contact component",()=>{
        render(<Contact/>);
        const inputBoxes=screen.getAllByRole("textbox");
        //console.log(inputBoxes)
        expect(inputBoxes.length).toBe(2);
    })
})

