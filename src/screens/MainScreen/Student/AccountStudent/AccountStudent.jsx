import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountStudent.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../../../reducers/permission';
import { setUserInfo } from '../../../../reducers/user';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const INPUTS = [
    {
        title: 'Mã số sinh viên',
        name: '20521764',
    },
    {
        title: 'Họ và tên',
        name: 'Nguyễn Công Danh',
    },
    {
        title: 'Ngày sinh',
        name: '10-10-2002',
    },
    {
        title: 'Giới tính',
        name: 'Nam',
    },
    {
        title: 'Email',
        name: '20521764@gm.uit.edu.vn',
    },
    {
        title: 'Số điện thoại',
        name: '0368341595',
    },
    {
        title: 'Địa chỉ',
        name: 'Thành phố Hồ Chí Minh',
    },
    {
        title: 'Lớp',
        name: 'KTPM2020',
    },
    {
        title: 'Khoa',
        name: 'Công nghệ phần mềm',
    },
    {
        title: 'Tình trạng học tập',
        name: 'Đang học',
    },
    {
        title: 'Chức vụ',
        name: 'Sinh viên',
    },
];

const InputField = ({ title, value }) => {
    return (
        <div className={cx('profile-detail-item')}>
            <span className={cx('input-title')}>{title}</span>
            <span className={cx('input-item')}>{value}</span>
        </div>
    );
};

const AccountStudent = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log('user: ', user);

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
            <h4 className={cx('main-heading')}>Thông tin cá nhân</h4>
            <div className={cx('profile')}>
                <div className={cx('profile-options')}>
                    <h5 className={cx('avt-name')}>{user.full_name}</h5>
                    <div className={cx('profile-avt')}>
                        <img src={user.image} alt="" />
                    </div>
                    <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                        Thay ảnh đại diện
                    </label>
                    <input type="file" id={cx('upload-input')} />
                    <div className={cx('options')}>
                        <button className={cx('option-btn', 'edit-info-btn')}>Sửa thông tin</button>
                        <button className={cx('option-btn', 'setting-pass-btn')}>Cài đặt mật khẩu</button>
                    </div>
                </div>
                <div className={cx('profile-detail')}>
                    {INPUTS.map((inputItem, index) => (
                        <InputField key={index} title={inputItem.title} value={inputItem.name} />
                    ))}
                </div>
            </div>
            <button className={cx('option-btn', 'signout-btn')} onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>
    );
};

export default AccountStudent;
