import React from 'react';
import classNames from 'classnames/bind';
import styles from './HomeBusiness.module.scss';

const cx = classNames.bind(styles);

const HomeBusiness = () => {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TRANG CHỦ</h3>
        </div>
    );
};

export default HomeBusiness;
