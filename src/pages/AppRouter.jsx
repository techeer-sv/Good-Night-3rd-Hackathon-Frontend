import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import WishList from './wishList';

function AppRouter() {
    return (
        <Router>

            <App>
                <Routes>
                    <Route path="/" element={<WishList />} />
                    <Route path="/wish" element={<Wish />} />
                </Routes>
            </App>
        </Router>
    );
}

export default AppRouter;