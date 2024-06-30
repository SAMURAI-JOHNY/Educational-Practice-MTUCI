import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import App from "./App";
import Parser from "../modules/Parser";
export const Pages: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/vacancies_filter" element={<App />}/>
                <Route path="/" element={<Parser />}/>
            </Routes>
        </BrowserRouter>
    )
}