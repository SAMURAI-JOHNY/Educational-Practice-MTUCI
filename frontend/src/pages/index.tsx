import React from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Table } from "./Table";
import Parser from "./Parser";
export const Pages: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/vacancies_filter" element={<Table />}/>
                <Route path="/" element={<Parser />}/>
            </Routes>
        </BrowserRouter>
    )
}