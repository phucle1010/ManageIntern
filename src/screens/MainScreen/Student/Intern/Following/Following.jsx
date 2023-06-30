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

const NOTICE_TEACHER = [
    {
        id: 1,
        content: 'Cần tham gia tích cực công việc thảo luận',
    },
    {
        id: 2,
        content: 'Cải thiện kỹ năng làm việc nhóm',
    },
];

const Following = () => {
    const [fileBusiness, setFileBusiness] = useState('');

    const loadFile = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/student/file/business', {headers: {'Authorization': token}})
            .then((res) => setFileBusiness(res.data))
            .catch((err) => console.log(err));
    }
    useEffect(() => loadFile(), []);

    const handleDownload = () => {
        const docxData = Buffer.from(Buffer.from(fileBusiness).toString(), 'base64');
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
                <h4 className={cx('main-heading')}>Đánh giá từ giảng viên</h4>
                <div className={cx('notice-list')}>
                    {NOTICE_TEACHER.map((notice, index) => (
                        <span key={index} className={cx('notice-item', 'teacher')}>
                            {notice.content}
                        </span>
                    ))}
                </div>
            </div>
            <div className={cx('following-category')}>
                <h4 className={cx('main-heading')}>File đánh giá từ công ty</h4>
                <div className={cx('notice-list')}>
                    {fileBusiness?<button onClick={handleDownload}>Tải xuống</button> : 'Doanh nghiệp chưa gữi file đánh giá!'}
                </div>
            </div>
        </div>
    );
};

export default Following;
