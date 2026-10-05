import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/create" element={<Create />} />

                <Route path="/edit/:id" element={<Edit />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;