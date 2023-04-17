import React from 'react';
import classNames from 'classnames/bind';
import styles from './Job.module.scss';
import { Delete, Star } from '@mui/icons-material';

const cx = classNames.bind(styles);

const Job = ({ job, isLibrary, setChosedJob }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-img')}>
                <img src={job.img} alt="" />
            </div>
            <h4>{job.name}</h4>
            <div className={cx('job-options')}>
                {isLibrary === true ? (
                    <Delete className={cx('btn-delete')} />
                ) : (
                    <Star
                        className={cx('btn-save', {
                            active: job.isSaved === true,
                        })}
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
