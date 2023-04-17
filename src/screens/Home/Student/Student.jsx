import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Student.module.scss';
import Menu from '../../../components/Menu';
import { MenuContext } from '../Home';

import HomeStudent from '../../MainScreen/Student/HomeStudent';
import Library from '../../MainScreen/Student/Library';
import Intern from '../../MainScreen/Student/Intern';
import Chat from '../../MainScreen/Student/Chat';
import AccountStudent from '../../MainScreen/Student/AccountStudent';

const cx = classNames.bind(styles);

const HOME_STUDENT = 'Trang chủ';
const LIBRARY = 'Thư viện';
const INTERN = 'Thực tập';
const CHAT = 'Trao đổi';
const ACCOUNT_STUDENT = 'Tài khoản';

const Student = ({ ...props }) => {
    const { minimizeMenu } = useContext(MenuContext);
    const { setMinimizeMenu, selectedSectionItem, setSelectedSectionItem } = props;

    let MainSection = null;

    (function () {
        switch (selectedSectionItem.name) {
            case HOME_STUDENT:
                MainSection = HomeStudent;
                break;
            case LIBRARY:
                MainSection = Library;
                break;
            case INTERN:
                MainSection = Intern;
                break;
            case CHAT:
                MainSection = Chat;
                break;
            case ACCOUNT_STUDENT:
                MainSection = AccountStudent;
                break;
            default:
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

export default Student;
