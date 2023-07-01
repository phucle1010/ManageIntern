import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import axios from 'axios';
import FileSaver from 'file-saver';
import { Buffer } from 'buffer';
import { Download } from '@mui/icons-material';

import Loading from '../../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

// const NOTICE_SYSTEM = [
//     {
//         id: 1,
//         content: 'Sinh viên vui lòng liên hệ trực tiếp văn phòng khoa để nhận giấy giới thiệu thực tập',
//     },
// ];

const Following = () => {
    const [fileTeacher, setFileTeacher] = useState('');
    const [fileBusiness, setFileBusiness] = useState('');
    const [loaded, setLoaded] = useState(false);

    const loadFile = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/student/file/business', { headers: { Authorization: token } })
            .then((res) => setFileBusiness(res.data))
            .catch((err) => console.log(err));
    };

    const handleDownloadFileBusiness = () => {
        const docxData = Buffer.from(Buffer.from(fileBusiness).toString(), 'base64');
        const blob = new Blob([docxData], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        FileSaver.saveAs(blob, 'File đánh giá từ Doanh nghiệp.docx');
    };

    const loadFileTeacher = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .get('/student/file/teacher', { headers: { Authorization: token } })
            .then((res) => setFileTeacher(res.data))
            .then(() => setLoaded(true))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        loadFile();
        loadFileTeacher();
    }, []);

    const handleDownloadFileTeacher = () => {
        const docxData = Buffer.from(Buffer.from(fileTeacher).toString(), 'base64');
        const blob = new Blob([docxData], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });
        FileSaver.saveAs(blob, 'File đánh giá từ Giảng viên hướng dẫn.docx');
    };

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    {/* <div className={cx('following-category')}>
                <h4 className={cx('main-heading')}>Thông báo hệ thống</h4>
                <div className={cx('notice-list')}>
                    {NOTICE_SYSTEM.map((notice, index) => (
                        <span key={index} className={cx('notice-item', 'system')}>
                            {notice.content}
                        </span>
                    ))}
                </div>
            </div> */}
                    <div className={cx('following-category')}>
                        <h4 className={cx('main-heading')}>File đánh giá từ Doanh nghiệp</h4>
                        <div className={cx('notice-list')}>
                            {fileBusiness ? (
                                <button className={cx('btn-download')} onClick={handleDownloadFileBusiness}>
                                    <Download className={cx('download-icon')} />
                                    Tải xuống
                                </button>
                            ) : (
                                'Doanh nghiệp chưa gửi file đánh giá!'
                            )}
                        </div>
                    </div>
                    <div className={cx('following-category')}>
                        <h4 className={cx('main-heading')}>File đánh giá từ Giảng viên hướng dẫn</h4>
                        <div className={cx('notice-list')}>
                            {fileTeacher ? (
                                <button className={cx('btn-download')} onClick={handleDownloadFileTeacher}>
                                    <Download className={cx('download-icon')} />
                                    Tải xuống
                                </button>
                            ) : (
                                'Giảng viên chưa gửi file đánh giá!'
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};

export default Following;
