import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AccountAdmin.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../../reducers/permission';
import { setUserInfo } from '../../../../reducers/user';

const cx = classNames.bind(styles);

const INPUTS = (user, setUser) => [
    {
        title: 'Họ và tên',
        name: user?.full_name,
        onChange: (event) => {
            setUser({ ...user, full_name: event.target.value });
        },
    },
    {
        title: 'Email',
        name: user?.email,
        onChange: (event) => {
            setUser({ ...user, email: event.target.value });
        },
    },
    {
        title: 'Địa chỉ',
        name: user?.address,
        onChange: (event) => {
            setUser({ ...user, address: event.target.value });
        },
    },
    {
        title: 'Số điện thoại',
        name: user?.phone,
        onChange: (event) => {
            setUser({ ...user, phone: event.target.value });
        },
    },
    {
        title: 'Chức vụ',
        name: 'Quản lý',
        onChange: () => {},
    },
];

const InputField = ({ title, value, onChange }) => {
    return (
        <div className={cx('profile-detail-item')}>
            <span className={cx('input-title')}>{title}</span>
            <input className={cx('input-item')} type="text" value={value} onChange={onChange} />
        </div>
    );
};

const AccountAdmin = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const loadData = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get(`/user`, { headers: { Authorization: token } })
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    };

    const updateUser = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .put(`/user/${user?.id}`, { user }, { headers: { Authorization: token } })
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => loadData(), []);

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
                    <h5 className={cx('avt-name')}>{user.full_name}</h5>
                    <div className={cx('profile-avt')}>
                        <img
                            src={
                                user?.image ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU'
                            }
                            alt=""
                        />
                    </div>
                    <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                        Thay ảnh đại diện
                    </label>
                    <input
                        type="file"
                        id={cx('upload-input')}
                        name="image"
                        onChange={(e) => {
                            const getbase64 = (file) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    setUser((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: reader.result,
                                        };
                                    });
                                };
                            };
                            if (e.target.files && e.target.files[0]) {
                                getbase64(e.target.files[0]);
                            }
                        }}
                    />
                    <div className={cx('options')}>
                        <button className={cx('option-btn', 'edit-info-btn')} onClick={() => updateUser()}>
                            Sửa thông tin
                        </button>
                        <button className={cx('option-btn', 'setting-pass-btn')}>Cài đặt mật khẩu</button>
                    </div>
                </div>
                <div className={cx('profile-detail')}>
                    {INPUTS(user, setUser).map((inputItem, index) => (
                        <InputField
                            key={index}
                            title={inputItem.title}
                            value={inputItem.name}
                            onChange={inputItem.onChange}
                        />
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

export default AccountAdmin;
