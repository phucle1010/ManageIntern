import React from 'react';
import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';

import SearchBox from '../../../../components/SearchBox';

const cx = classNames.bind(styles);

const HomeAdmin = () => {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TRANG CHỦ</h3>
            <SearchBox className={cx('search')} />
        </div>
    );
};

export default HomeAdmin;
