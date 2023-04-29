import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Business.module.scss';
import Menu from '../../../components/Menu';
import { MenuContext } from '../Home';
import HomeBusiness from '../../MainScreen/Business/HomeBusiness';
import InternBusiness from '../../MainScreen/Business/InternBusiness';
import AccountBusiness from '../../MainScreen/Business/AccountBusiness';

const cx = classNames.bind(styles);

const HOME_BUSINESS = 'Trang chủ';
const INTERN_BUSINESS = 'Thực tập';
const ACCOUNT_BUSINESS = 'Tài khoản';

const Business = ({ ...props }) => {
    const { minimizeMenu } = useContext(MenuContext);
    const { setMinimizeMenu, selectedSectionItem, setSelectedSectionItem } = props;

    let MainSection = null;

    (function () {
        switch (selectedSectionItem.name) {
            case HOME_BUSINESS:
                MainSection = HomeBusiness;
                break;
            case INTERN_BUSINESS:
                MainSection = InternBusiness;
                break;
            case ACCOUNT_BUSINESS:
                MainSection = AccountBusiness;
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

export default Business;
