import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import axios from 'axios';
const FileSaver = require('file-saver');
const { Buffer } = require('buffer');

const cx = classNames.bind(styles);

const NOTICE_SYSTEM = [
    {
        id: 1,
        content: 'Sinh viên vui lòng liên hệ trực tiếp văn phòng khoa để nhận giấy giới thiệu thực tập',
    },
];

const Following = () => {
    const [fileTeacher, setFileTeacher] = useState('');

    const loadFileTeacher = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/student/file/teacher', {headers: {'Authorization': token}})
            .then((res) => setFileTeacher(res.data))
            .catch((err) => console.log(err));
    }
    useEffect(() => loadFileTeacher(), []);

    const handleDownloadFileTeacher = () => {
        const docxData = Buffer.from(Buffer.from(fileTeacher).toString(), 'base64');
        const blob = new Blob([docxData], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
        FileSaver.saveAs(blob, 'file.docx');
    }
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
            <div className={cx('following-category')}>
                <h4 className={cx('main-heading')}>File đánh giá từ giảng viên hướng dẫn</h4>
                <div className={cx('notice-list')}>
                    {fileTeacher?<button onClick={handleDownloadFileTeacher}>Tải xuống</button> : 'Giảng viên chưa gữi file đánh giá!'}
                </div>
            </div>
        </div>
    );
};

export default Following;
