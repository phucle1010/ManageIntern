import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Teacher.module.scss';
import Menu from '../../../components/Menu';
import { MenuContext } from '../Home';

import HomeTeacher from '../../MainScreen/Teacher/HomeTeacher';
import ScoreTable from '../../MainScreen/Teacher/ScoreTable';
import Chat from '../../MainScreen/Teacher/Chat';
import AccountTeacher from '../../MainScreen/Teacher/AccountTeacher';

const cx = classNames.bind(styles);

const HOME_TEACHER = 'Trang chủ';
const SCORE_TABLE = 'Bảng điểm';
const CHAT = 'Trao đổi';
const ACCOUNT_TEACHER = 'Tài khoản';

const Teacher = ({ ...props }) => {
    const { minimizeMenu } = useContext(MenuContext);
    const { setMinimizeMenu, selectedSectionItem, setSelectedSectionItem } = props;

    let MainSection = null;

    (function () {
        switch (selectedSectionItem.name) {
            case HOME_TEACHER:
                MainSection = HomeTeacher;
                break;
            case SCORE_TABLE:
                MainSection = ScoreTable;
                break;
            case CHAT:
                MainSection = Chat;
                break;
            case ACCOUNT_TEACHER:
                MainSection = AccountTeacher;
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

export default Teacher;
