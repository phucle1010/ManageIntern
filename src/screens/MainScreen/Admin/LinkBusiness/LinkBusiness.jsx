import React from 'react';
import classNames from 'classnames/bind';
import styles from './LinkBusiness.module.scss';

import SearchBox from '../../../../components/SearchBox';

const cx = classNames.bind(styles);

const LinkBusiness = () => {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title-heading')}>DOANH NGHIỆP</h4>
            <SearchBox className={cx('search')} />
        </div>
    );
};

export default LinkBusiness;
