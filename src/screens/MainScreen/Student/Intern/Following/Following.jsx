import React from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';

const cx = classNames.bind(styles);

const NOTICE_SYSTEM = [
    {
        id: 1,
        content: 'Sinh viên vui lòng liên hệ trực tiếp văn phòng khoa để nhận giấy giới thiệu thực tập',
    },
];

const Following = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('following-category')}>
                <h4 className={cx('main-heading')}>Thông báo hệ thống</h4>
                <div className={cx('notice-list')}>
                    {NOTICE_SYSTEM.map((notice, index) => (
                        <span key={index} className={cx('notice-item', 'system')}>
                            {notice.content}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Following;
