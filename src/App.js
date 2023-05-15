/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import router from './routes';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <HashRouter>
                <Routes>
                    {router.map((route) => {
                        const ScreenComponent = route.element;
                        return <Route key={route.path} path={route.path} element={<ScreenComponent />} />;
                    })}
                </Routes>
            </HashRouter>
        </Suspense>
    );
}

export default App;
