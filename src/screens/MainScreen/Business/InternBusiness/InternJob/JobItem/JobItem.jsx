import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';

const cx = classNames.bind(styles);

const JobItem = ({ job, setChosedJob }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-desc')}>
                <h4>Mã công việc: {`${job.id}`}</h4>
            </div>
            <div className={cx('job-img')}>
                <img src={job.img} alt="" />
            </div>
            <h4 className={cx('job-name')}>{job.name}</h4>
            <span className={cx('job-vacancy')}>{`Số lượng cần tuyển: ${job.vacancies}`}</span>
            <button className={cx('btn-view')} onClick={() => setChosedJob(job)}>
                Xem chi tiết
            </button>
        </div>
    );
};

export default JobItem;
