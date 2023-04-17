import React from 'react';
import classNames from 'classnames/bind';
import styles from './NewTeacher.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewTeacher = ({ close, editable }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Thông tin giảng viên</h3>
            <div className={cx('user-info')}>
                <div className={cx('user-upload')}>
                    <h4 className={cx('upload-heading')}>Ảnh đại diện</h4>
                    <div className={cx('upload-avatar')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                        Chọn File
                    </label>
                    <input type="file" id={cx('upload-input')} readOnly={!editable} />
                </div>
                <div className={cx('user-detail')}>
                    <h4 className={cx('detail-heading')}>Thông tin cá nhân</h4>
                    <div className={cx('user-form')}>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Họ và tên</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="name"
                                placeholder="Nguyễn Văn A"
                                readOnly={!editable}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày sinh</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="birth"
                                placeholder="10/10/2002"
                                readOnly={!editable}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="phone"
                                placeholder="0368xxx"
                                readOnly={!editable}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Email</h5>
                            <input
                                className={cx('input-item')}
                                type="email"
                                name="email"
                                placeholder="abc@gmail.com"
                                readOnly={!editable}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Địa chỉ</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="address"
                                placeholder="Thành phố Hồ Chí Minh"
                                readOnly={!editable}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Khoa</h5>
                            <select className={cx('input-item')} name="department" readOnly={!editable}>
                                <option>Chọn Khoa</option>
                                <option>Công nghệ phần mềm</option>
                                <option>Kỹ thuật máy tính</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')}>Lưu</button>
        </div>
    );
};

export default NewTeacher;
