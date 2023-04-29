import React from 'react';
import classNames from 'classnames/bind';
import styles from './ViewStudent.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const ViewStudent = ({ student, setChosedStudent }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => setChosedStudent({})} />
            <h3 className={cx('main-heading')}>Thông tin sinh viên</h3>
            <div className={cx('profile')}>
                <div className={cx('profile-options')}>
                    <div className={cx('profile-avt')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <h3 className={cx('job-position')}>{student.position}</h3>
                    <h5 className={cx('name')}>{student.name}</h5>
                </div>
                <div className={cx('profile-detail')}>
                    <div className={cx('user-form')}>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Đại học / Cao đẳng</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="university"
                                placeholder="Tên trường"
                                readOnly={true}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="email"
                                placeholder="0368xxx"
                                readOnly={true}
                                value={student.phone}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Email</h5>
                            <input
                                className={cx('input-item')}
                                type="email"
                                name="email"
                                placeholder="abc@gmail.com"
                                readOnly={true}
                                value={student.email}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày vào làm</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="entryDate"
                                // placeholder="Thành phố Hồ Chí Minh"
                                value={student.entryDay}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Địa chỉ</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="address"
                                placeholder="Thành phố Hồ Chí Minh"
                                readOnly={true}
                                value={student.address}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Trạng thái thực tập</h5>
                            <select
                                className={cx('input-item')}
                                name="major"
                                value={student.internStatus === 'interning' ? 'Đang thực tập' : 'Đã thực tập'}
                            >
                                <option>Chọn</option>
                                <option>Đang thực tập</option>
                                <option>Đã thực tập</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('option-btn')}>
                <button className={cx('save-btn')}>Lưu thay đổi</button>
            </div>
        </div>
    );
};

export default ViewStudent;
