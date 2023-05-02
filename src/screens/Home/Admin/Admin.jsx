/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import Menu from '../../../components/Menu';
import { MenuContext } from '../Home';
import HomeAdmin from '../../MainScreen/Admin/HomeAdmin';
import ManageStudent from '../../MainScreen/Admin/ManageStudent';
import ManageTeacher from '../../MainScreen/Admin/ManageTeacher';
import ManageClass from '../../MainScreen/Admin/ManageClass';
import ManageIntern from '../../MainScreen/Admin/ManageIntern';
import LinkBusiness from '../../MainScreen/Admin/LinkBusiness';
import AccountAdmin from '../../MainScreen/Admin/AccountAdmin';
import ManageDepartment from '../../MainScreen/Admin/ManageDepartment';

const cx = classNames.bind(styles);

const HOME_ADMIN = 'Trang chủ';
const MANAGE_STUDENT = 'Sinh viên';
const MANAGE_TEACHER = 'Giảng viên';
const MANAGE_CLASS = 'Lớp';
const DEPARTMENT = 'Khoa';
const MANAGE_INTERN = 'Thực tập';
const LINK_BUSINESS = 'Doanh nghiệp';
const ACCOUNT_ADMIN = 'Tài khoản';

const Admin = ({ ...props }) => {
    const { minimizeMenu } = useContext(MenuContext);
    const { setMinimizeMenu, selectedSectionItem, setSelectedSectionItem } = props;

    let MainSection = null;

    (function () {
        switch (selectedSectionItem.name) {
            case HOME_ADMIN:
                MainSection = HomeAdmin;
                break;
            case MANAGE_STUDENT:
                MainSection = ManageStudent;
                break;
            case MANAGE_TEACHER:
                MainSection = ManageTeacher;
                break;
            case DEPARTMENT:
                MainSection = ManageDepartment;
                break;
            case MANAGE_CLASS:
                MainSection = ManageClass;
                break;
            case MANAGE_INTERN:
                MainSection = ManageIntern;
                break;
            case LINK_BUSINESS:
                MainSection = LinkBusiness;
                break;
            case ACCOUNT_ADMIN:
                MainSection = AccountAdmin;
                break;
            default:
                MainSection = null;
                break;
        }
    })();

    return (
        <div className={cx('wrapper')}>
            <Menu
                setMinimizeMenu={setMinimizeMenu}
                setSelectedSectionItem={setSelectedSectionItem}
                selectedSectionItem={selectedSectionItem}
            />
            <div
                className={cx('section', {
                    maximizeSection: minimizeMenu,
                })}
            >
                {MainSection !== null && <MainSection />}
            </div>
        </div>
    );
};

export default Admin;
