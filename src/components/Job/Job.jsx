import React from 'react';
import classNames from 'classnames/bind';
import styles from './Job.module.scss';
import { Delete, Star } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const Job = ({ job, isLibrary, setChosedJob }) => {
    const token = JSON.parse(localStorage.getItem('user_token'));

    const changeStatusInterestJob = () => {
        axios
            .post(`/student/job/${job.id}/save_interested`, {token: token})
            .then((res) => alert('Thanh cong'))
            .catch((err) => console.log(err));
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-img')}>
                <img src={job.image} alt="" />
            </div>
            <h4>{job.job_name}</h4>
            <div className={cx('job-options')}>
                {isLibrary === true ? (
                    <Delete className={cx('btn-delete')} />
                ) : (
                    <Star
                        className={cx('btn-save', {
                            active: job.isSaved === true,
                        })}
                        onClick={() => changeStatusInterestJob()}
                    />
                )}
                <button
                    className={cx('btn-view')}
                    onClick={() => {
                        console.log(job);
                        setChosedJob(job);
                    }}
                >
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default Job;
