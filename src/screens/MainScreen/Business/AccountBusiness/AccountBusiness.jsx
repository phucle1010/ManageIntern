import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountBusiness.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../../reducers/permission';
import { setUserInfo } from '../../../../reducers/user';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const AccountBusiness = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.put('/user/logout').then((res) => {
            if (res.data.statusCode === 200) {
                localStorage.setItem('user_token', JSON.stringify(''));
                dispatch(setRole({ role: 0 }));
                dispatch(setUserInfo({}));
                setTimeout(() => navigate('/login'), 2000);
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TÀI KHOẢN</h3>
            <button className={cx('option-btn', 'signout-btn')} onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>
    );
};

export default AccountBusiness;
