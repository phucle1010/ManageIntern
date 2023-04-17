/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, createContext, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import router from './routes';
import LoadingSpinner from './components/LoadingSpinner';

const RoleContext = createContext();

function App() {
    const [successfulLogin, setSuccessfulLogin] = useState(false);
    const [role, setRole] = useState(-1);

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <RoleContext.Provider value={{ role, successfulLogin }}>
                <HashRouter>
                    <Routes>
                        {router.map((route) => {
                            const ScreenComponent = route.element;
                            return (
                                role && (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={
                                            <ScreenComponent
                                                setRole={setRole}
                                                setSuccessfulLogin={setSuccessfulLogin}
                                            />
                                        }
                                    />
                                )
                            );
                        })}
                    </Routes>
                </HashRouter>
            </RoleContext.Provider>
        </Suspense>
    );
}

export default App;
export { RoleContext };
