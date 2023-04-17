import React from 'react';
import classNames from 'classnames/bind';
import styles from './OpenSubject.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const OpenSubject = ({ close }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Quản lý môn học thực tập</h3>
        </div>
    );
};

export default OpenSubject;
