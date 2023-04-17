import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NewClass.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewClass = ({ close, editable }) => {
    console.log(editable);
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Thông tin lớp</h3>
            <div className={cx('user-detail')}>
                <div className={cx('user-form')}>
                    <div className={cx('user-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Tên lớp</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            placeholder="KTPM2020"
                            readOnly={!editable}
                        />
                    </div>
                    <div className={cx('user-data-item')}>
                        <h5 className={cx('input-title')}>Khoa</h5>
                        <select className={cx('input-item')} name="department" readOnly={!editable}>
                            <option>Chọn Khoa</option>
                            <option>Công nghệ phần mềm</option>
                            <option>Kỹ thuật máy tính</option>
                        </select>
                    </div>
                    <div className={cx('user-data-item')}>
                        <h5 className={cx('input-title')}>Chủ nhiệm lớp</h5>
                        <select className={cx('input-item')} name="department" readOnly={!editable}>
                            <option>Chọn giảng viên</option>
                            <option>Trần Khánh Nguyên</option>
                            <option>Võ Thanh Tùng</option>
                        </select>
                    </div>
                    <div className={cx('user-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Sĩ số lớp</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            placeholder="100"
                            readOnly={!editable}
                        />
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')}>Lưu</button>
        </div>
    );
};

export default NewClass;
