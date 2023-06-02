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
                <img
                    src={
                        business.image ||
                        'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                    }
                    alt=""
                />
            </div>
            <h3 className={cx('business-name')}>{business.company_name}</h3>
            <h5 className={cx('business-address')}>{business.address}</h5>
            <h5 className={cx('business-phone')}>{`(+84) ` + business.phone.substring(1)}</h5>
        </div>
    );
};

export default BusinessItem;
