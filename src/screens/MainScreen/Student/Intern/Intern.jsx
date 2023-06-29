import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Intern.module.scss';

import ChooseSubject from './ChooseSubject';
import SendRequest from './SendRequest';
import Report from './Report';
import Following from './Following';

const cx = classNames.bind(styles);

const MENUS = ['Đăng ký môn', 'Gửi yêu cầu', 'Báo cáo', 'Theo dõi'];

const Intern = () => {
    const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);

    let MainContent = () => {};

    (function () {
        switch (selectedMenuItemIndex) {
            case 0:
                MainContent = ChooseSubject;
                break;
            case 1:
                MainContent = SendRequest;
                break;
            case 2:
                MainContent = Report;
                break;
            case 3:
                MainContent = Following;
                break;
            default:
                break;
        }
    })();

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>THỰC TẬP</h3>
            <div className={cx('menu-list')}>
                {MENUS.map((menu, index) => (
                    <span
                        key={index}
                        className={cx('menu-item', {
                            active: index === selectedMenuItemIndex,
                        })}
                        onClick={() => setSelectedMenuItemIndex(index)}
                    >
                        {menu}
                    </span>
                ))}
            </div>
            <div className={cx('main-content')}>{<MainContent />}</div>
        </div>
    );
};

export default Intern;
