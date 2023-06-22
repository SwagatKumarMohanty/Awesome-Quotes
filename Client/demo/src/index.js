
import React from "react";

import ReactDOM from 'react-dom/client';

import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

import Launch from "./Launch";





const root2=ReactDOM.createRoot(document.getElementById('root2'));

root2.render(
    <BrowserRouter>
    <Launch></Launch>
    </BrowserRouter>
);