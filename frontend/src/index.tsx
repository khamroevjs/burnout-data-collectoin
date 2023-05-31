import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";

const colors = {
    brand: {
        50: "#E6FFFA",
        100: "#B2F5EA",
        200: "#81E6D9",
        300: "#4FD1C5",
        400: "#38B2AC",
        500: "#319795",
        600: "#2C7A7B",
        700: "#285E61",
        800: "#234E52",
        900: "#1D4044"
    }
};
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const fonts = {
    fonts: {
        heading: 'Roboto',
    },
};
const theme = extendTheme({colors, config}, fonts);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ChakraProvider theme={theme}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ChakraProvider>
);
