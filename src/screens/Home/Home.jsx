import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../../App';
const Admin = React.lazy(() => import('./Admin'));
const Teacher = React.lazy(() => import('./Teacher'));
const Student = React.lazy(() => import('./Student'));
const Business = React.lazy(() => import('./Business'));

const ADMIN_ROLE = 1;
const TEACHER_ROLE = 2;
const STUDENT_ROLE = 3;
const BUSINESS_ROLE = 4;
const ROLES = [ADMIN_ROLE, TEACHER_ROLE, STUDENT_ROLE, BUSINESS_ROLE];

const MenuContext = createContext();

const Home = () => {
    const { role, successfulLogin } = useContext(RoleContext);
    const [minimizeMenu, setMinimizeMenu] = useState(false);
    const [selectedSectionItem, setSelectedSectionItem] = useState({});

    let MainHome = null;
    const navigate = useNavigate();

    useEffect(() => {
        if (!successfulLogin) {
            navigate('/login');
        }
    });

    (function () {
        switch (role) {
            case ADMIN_ROLE:
                MainHome = Admin;
                break;
            case TEACHER_ROLE:
                MainHome = Teacher;
                break;
            case STUDENT_ROLE:
                MainHome = Student;
                break;
            case BUSINESS_ROLE:
                MainHome = Business;
                break;
            default:
                break;
        }
    })();

    return (
        ROLES.includes(role) &&
        MainHome !== null && (
            <MenuContext.Provider value={{ minimizeMenu }}>
                <MainHome
                    setMinimizeMenu={setMinimizeMenu}
                    selectedSectionItem={selectedSectionItem}
                    setSelectedSectionItem={setSelectedSectionItem}
                />
            </MenuContext.Provider>
        )
    );
};

export default Home;
export { MenuContext };
