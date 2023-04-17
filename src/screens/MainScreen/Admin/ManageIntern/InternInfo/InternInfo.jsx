import React from 'react';
import classNames from 'classnames/bind';
import styles from './InternInfo.module.scss';
import { Close } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const cx = classNames.bind(styles);

const GUILDLINE_TEACHER = {
    id: 1,
    name: 'Đặng Minh Quang',
    department: 'Mạng máy tính',
    email: 'quangdm@gm.uit.edu.vn',
    img: 'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png',
};

const InternInfo = ({ close, student }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close('')} />
            <h3 className={cx('title-heading')}>THÔNG TIN THỰC TẬP</h3>
            <div className={cx('list-info')}>
                <h4 className={cx('list-heading')}>Thông tin sinh viên</h4>
                <div className={cx('list-detail', 'student')}>
                    <div className={cx('list-detail-item')}>
                        <Avatar src={student.img} />
                    </div>
                    <span className={cx('list-detail-item')}>{student.name}</span>
                    <span className={cx('list-detail-item')}>{student.position}</span>
                    <div className={cx('list-detail-item')}>
                        <div className={cx('status')}>Đang chờ</div>
                    </div>
                </div>
            </div>
            <div className={cx('list-info')}>
                <h4 className={cx('list-heading')}>Thông tin giảng viên hướng dẫn</h4>
                <div className={cx('list-detail', 'student')}>
                    <div className={cx('list-detail-item')}>
                        <Avatar src={GUILDLINE_TEACHER.img} />
                    </div>
                    <span className={cx('list-detail-item')}>{GUILDLINE_TEACHER.name}</span>
                    <span className={cx('list-detail-item')}>{GUILDLINE_TEACHER.department}</span>
                    <span className={cx('list-detail-item')}>{GUILDLINE_TEACHER.email}</span>
                </div>
            </div>
            <div className={cx('intern-info')}>
                <h4 className={cx('list-heading')}>Mẫu thông tin</h4>
                <div className={cx('intern-detail')}>
                    <input
                        className={cx('intern-input')}
                        type="text"
                        placeholder="File đính kèm thông tin giới thiệu thực tập"
                        readOnly={true}
                    />
                    <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                        <span className={cx('gif-btn')}>Đính kèm</span>
                    </label>
                    <input type="file" id={cx('gif-input')} />
                </div>
            </div>
            <div className={cx('options-btn')}>
                <button className={cx('btn-submit')} onClick={() => {}}>
                    Xác nhận
                </button>
                <button className={cx('btn-submit', 'btn-cancel')} onClick={() => {}}>
                    Hủy yêu cầu
                </button>
            </div>
        </div>
    );
};

export default InternInfo;
