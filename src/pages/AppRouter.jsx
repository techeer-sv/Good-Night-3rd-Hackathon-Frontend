import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import WishList from './wishList';
import Wish from './wishForm';
import WishDetail from './wishDetail';
import WishAllow from './wishAllow';

function AppRouter() {
    return (
        <Router>
            <App>
                <Routes>
                    <Route path="/" element={<WishList />} />
                    <Route path="/wish" element={<Wish />} />
                    <Route path="/wishdetail/:id" element={<WishDetail />} />
                    <Route path="/wishallow" element={<WishAllow />} />
                </Routes>
            </App>
        </Router>
    );
}

export default AppRouter;