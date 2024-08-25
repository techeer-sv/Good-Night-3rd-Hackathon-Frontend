import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/App';

import OnBoardingPage from './OnBoardingPage';


function AppRouter() {
    return (
        <Router>
            <App>
                <Routes>
                    <Route path="/" element={<OnBoardingPage />} />
                </Routes>
            </App>
        </Router>
    );
}

export default AppRouter;