import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Menu.module.scss';
import AdminMenu from './Admin';
import TeacherMenu from './Teacher';
import StudentMenu from './Student';
import BusinessMenu from './Business';
import { MenuContext } from '../../screens/Home/Home';

const ADMIN_ROLE = 1;
const TEACHER_ROLE = 2;
const STUDENT_ROLE = 3;
const BUSINESS_ROLE = 4;

const cx = classNames.bind(styles);

const Menu = ({ setMinimizeMenu, setSelectedSectionItem, selectedSectionItem }) => {
    const roleState = useSelector((state) => state.role);

    const { minimizeMenu } = useContext(MenuContext);
    let MenuComponent = null;

    (function () {
        switch (roleState) {
            case ADMIN_ROLE:
                MenuComponent = AdminMenu;
                break;
            case TEACHER_ROLE:
                MenuComponent = TeacherMenu;
                break;
            case STUDENT_ROLE:
                MenuComponent = StudentMenu;
                break;
            case BUSINESS_ROLE:
                MenuComponent = BusinessMenu;
                break;
            default:
                break;
        }
    })();

    return (
        <div
            className={cx('wrapper', {
                miniMenu: minimizeMenu,
            })}
        >
            <MenuComponent
                setMinimizeMenu={setMinimizeMenu}
                setSelectedSectionItem={setSelectedSectionItem}
                selectedSectionItem={selectedSectionItem}
            />
        </div>
    );
};

export default Menu;
