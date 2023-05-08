import React from 'react';
import classNames from 'classnames/bind';
import styles from './NewDepartment.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewDepartment = ({ close, editable }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Thông tin khoa</h3>
            <div className={cx('department-detail')}>
                <div className={cx('department-form')}>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Tên khoa</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            placeholder="KTPM2020"
                            readOnly={!editable}
                        />
                    </div>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Trưởng khoa</h5>
                        <select className={cx('input-item')} name="department" readOnly={!editable}>
                            <option>Chọn giảng viên</option>
                            <option>Trần Khánh Nguyên</option>
                            <option>Võ Thanh Tùng</option>
                        </select>
                    </div>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Số lượng giảng viên</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            placeholder="100"
                            readOnly={!editable}
                        />
                    </div>
                    <div className={cx('department-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Số lượng ngành học</h5>
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

export default NewDepartment;
