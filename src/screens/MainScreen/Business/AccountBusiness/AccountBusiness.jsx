import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountBusiness.module.scss';

const cx = classNames.bind(styles);

const AccountBusiness = () => {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TÀI KHOẢN</h3>
        </div>
    );
};

export default AccountBusiness;
