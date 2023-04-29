import React from 'react';
import classNames from 'classnames/bind';
import styles from './BusinessItem.module.scss';
import { Visibility } from '@mui/icons-material';

const cx = classNames.bind(styles);

const BusinessItem = ({ business, setChosedBusiness }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('business-img')}>
                <Visibility className={cx('view')} onClick={() => setChosedBusiness(business)} />
                <img src={business.img} alt="" />
            </div>
            <h3 className={cx('business-name')}>{business.name}</h3>
            <h5 className={cx('business-address')}>{business.address}</h5>
            <h5 className={cx('business-phone')}>{`(+84) ` + business.phone}</h5>
        </div>
    );
};

export default BusinessItem;
