import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import WishList from './wish/wishList';

function AppRouter() {
    return (
        <Router>
            <App>
                <Routes>
                    <Route path="/wish-tree" element={<WishList />} />
                </Routes>
            </App>
        </Router>
    );
}

export default AppRouter;