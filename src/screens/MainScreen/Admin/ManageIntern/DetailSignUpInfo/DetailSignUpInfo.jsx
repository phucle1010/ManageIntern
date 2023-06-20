import React from 'react';
import classNames from 'classnames/bind';
import styles from './DetailSignUpInfo.module.scss';
import { Close } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import axios from 'axios';

const cx = classNames.bind(styles);

const DetailSignUpInfo = ({ close, student }) => {
    const confirmSignUpLearnIntern = () => {
        axios
            .put(`/admin/student/${student.id}/confirm_learn_intern`, { key: student.key })
            .then((res) => alert(res.data))
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close('')} />
            <h3 className={cx('title-heading')}>THÔNG TIN THỰC TẬP</h3>
            <div className={cx('list-info')}>
                <h4 className={cx('list-heading')}>Thông tin sinh viên</h4>
                <div className={cx('list-detail', 'student')}>
                    <div className={cx('list-detail-item')}>
                        <Avatar src={student.studentImage} />
                    </div>
                    <span className={cx('list-detail-item')}>{student.studentName}</span>
                    <span className={cx('list-detail-item')}>{student.className}</span>
                    <div className={cx('list-detail-item')}>
                        <div className={cx('status')}>Đang chờ</div>
                    </div>
                </div>
            </div>
            <div className={cx('list-info')}>
                <h4 className={cx('list-heading')}>Thông tin giảng viên hướng dẫn</h4>
                <div className={cx('list-detail', 'student')}>
                    <div className={cx('list-detail-item')}>
                        <Avatar src={student.teacherImage} />
                    </div>
                    <span className={cx('list-detail-item')}>{student.teacherName}</span>
                    <span className={cx('list-detail-item')}>{student.teacherDepartmentName}</span>
                    <span className={cx('list-detail-item')}>{student.teacherEmail}</span>
                </div>
            </div>
            {/* <div className={cx('intern-info')}>
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
            </div> */}
            <div className={cx('options-btn')}>
                <button
                    className={cx('btn-submit')}
                    onClick={() => {
                        confirmSignUpLearnIntern();
                    }}
                >
                    Xác nhận
                </button>
                <button className={cx('btn-submit', 'btn-cancel')} onClick={() => {}}>
                    Không đồng ý
                </button>
            </div>
        </div>
    );
};

export default DetailSignUpInfo;
