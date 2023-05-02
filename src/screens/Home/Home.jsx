/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from '../../reducers/login';

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
    const roleState = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const [minimizeMenu, setMinimizeMenu] = useState(false);
    const [selectedSectionItem, setSelectedSectionItem] = useState({});

    let MainHome = null;
    const navigate = useNavigate();

    const handleGetUserData = () => {
        const userToken = localStorage.getItem('user_token');
        if (userToken === null) {
            localStorage.setItem('user_token', JSON.stringify(''));
        } else {
            if (JSON.parse(userToken) === '') {
                navigate('/login');
            } else {
                axios.get('/user/data', { params: { token: JSON.parse(userToken) } }).then((res) => {
                    switch (res.data.responseData[0].permission_id) {
                        case ADMIN_ROLE:
                            dispatch(setRole({ role: ADMIN_ROLE }));
                            break;
                        case TEACHER_ROLE:
                            dispatch(setRole({ role: TEACHER_ROLE }));
                            break;
                        case STUDENT_ROLE:
                            dispatch(setRole({ role: STUDENT_ROLE }));
                            break;
                        case BUSINESS_ROLE:
                            dispatch(setRole({ role: BUSINESS_ROLE }));
                            break;
                        default:
                            break;
                    }
                });
            }
        }
    };

    useEffect(() => {
        handleGetUserData();
    }, [roleState.role]);

    (function () {
        switch (roleState.role) {
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
        roleState.role !== 0 &&
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
