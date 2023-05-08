import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountTeacher.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../../reducers/permission';
import { setUserInfo } from '../../../../reducers/user';

const cx = classNames.bind(styles);

const INPUTS = [
    {
        title: 'Mã giảng viên',
        name: '123',
    },
    {
        title: 'Họ và tên',
        name: 'Đặng Minh Quang',
    },
    {
        title: 'Ngày sinh',
        name: '14-05-1992',
    },
    {
        title: 'Giới tính',
        name: 'Nam',
    },
    {
        title: 'Email',
        name: 'quangdm@gm.uit.edu.vn',
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
        title: 'Khoa',
        name: 'Công nghệ phần mềm',
    },
    {
        title: 'Tình trạng học tập',
        name: 'Đang dạy',
    },
    {
        title: 'Chức vụ',
        name: 'Giảng viên',
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

const AccountTeacher = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.put('/user/logout').then((res) => {
            if (res.data.statusCode === 200) {
                localStorage.setItem('user_token', JSON.stringify(''));
                dispatch(setRole({ role: 0 }));
                dispatch(setUserInfo({}));
            }
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TÀI KHOẢN</h3>
            <h4 className={cx('main-heading')}>Thông tin cá nhân</h4>
            <div className={cx('profile')}>
                <div className={cx('profile-options')}>
                    <h5 className={cx('avt-name')}>Nguyễn Công Danh</h5>
                    <div className={cx('profile-avt')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU"
                            alt=""
                        />
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
                {/* <div className={cx('profile-options')}></div> */}
            </div>
            <button className={cx('option-btn', 'signout-btn')} onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>
    );
};

export default AccountTeacher;
