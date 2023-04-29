import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountStudent.module.scss';

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
        name: 'danhnc@gm.uit.edu.vn',
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
            </div>
            <button className={cx('option-btn', 'signout-btn')} onClick={() => window.location.reload()}>
                Đăng xuất
            </button>
        </div>
    );
};

export default AccountStudent;
