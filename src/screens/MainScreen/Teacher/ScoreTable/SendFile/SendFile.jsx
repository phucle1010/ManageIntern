import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './SendFile.module.scss';
import { AttachFile, Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const SendFile = ({ show, student }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => show({})} />
            <h3 className={cx('main-heading')}>Thông tin đánh giá môn học</h3>
            <div>
                <h4 className={cx('title-heading')}>
                    Họ và tên: <span>{student.full_name}</span>
                </h4>
            </div>
            <div>
                <h4 className={cx('title-heading')}>
                    Mã số sinh viên: <span>{student.studentId}</span>
                </h4>
            </div>

            <div className={cx('intern-detail')}>
                <input
                    className={cx('intern-input')}
                    type="text"
                    placeholder="Phiếu đánh giá quá trình thực tập"
                    readOnly={true}
                />
                <input type="file" id={cx('gif-input')} />
                <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                    <AttachFile className={cx('gif-btn')} />
                </label>
            </div>
            <div className={cx('btn-options')}>
                <button className={cx('btn-send')}>Gửi file</button>
            </div>
        </div>
    );
};

export default SendFile;
