import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InternBusiness.module.scss';

import InternJob from './InternJob';
import Student from './Student';
import Requirement from './Requirement';

const cx = classNames.bind(styles);

const MENUS = ['Công việc', 'Sinh viên', 'Yêu cầu'];

const InternBusiness = () => {
    const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(0);

    let MainContent = () => {};

    (function () {
        switch (selectedMenuItemIndex) {
            case 0:
                MainContent = InternJob;
                break;
            case 1:
                MainContent = Student;
                break;
            case 2:
                MainContent = Requirement;
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

export default InternBusiness;
