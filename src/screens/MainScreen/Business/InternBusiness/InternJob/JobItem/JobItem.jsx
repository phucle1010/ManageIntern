import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';

const cx = classNames.bind(styles);

const JobItem = ({ job, setChosedJob, setEditable }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-desc')}>
                <h4>Mã công việc: {`${job.id}`}</h4>
            </div>
            <div className={cx('job-img')}>
                <img src={job.image} alt="" />
            </div>
            <h4 className={cx('job-name')}>{job.job_name}</h4>
            <span className={cx('job-vacancy')}>{`Số lượng cần tuyển: ${job.vacancies}`}</span>
            <div className={cx('btn-options')}>
                <button
                    className={cx('btn-view')}
                    onClick={() => {
                        setChosedJob(job);
                        setEditable(false);
                    }}
                >
                    Xem chi tiết
                </button>
                <button
                    className={cx('btn-edit')}
                    onClick={() => {
                        setChosedJob(job);
                        setEditable(true);
                    }}
                >
                    Chỉnh sửa
                </button>
            </div>
        </div>
    );
};

export default JobItem;
