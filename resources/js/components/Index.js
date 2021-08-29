import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Halaman from './halaman';

function Home() {
    return (
        <ChakraProvider>
            <Halaman />
        </ChakraProvider>
    );
}

export default Home;

if (document.getElementById('home')) {
    ReactDOM.render(<Home />, document.getElementById('home'));
}