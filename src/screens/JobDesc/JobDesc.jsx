import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDesc.module.scss';
import { Close, Share } from '@mui/icons-material';

const cx = classNames.bind(styles);

const JobDesc = ({ job, closeScreen }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => closeScreen({})} />
            <h3 className={cx('main-heading')}>{job.name}</h3>
            <div className={cx('job-general')}>
                <div className={cx('job-summary')}>
                    <div className={cx('job-img')}>
                        <img src={job.img} alt="" />
                    </div>
                    <div className={cx('job-skills')}>
                        <span className={cx('title-heading', 'skills')}>Kĩ năng yêu cầu:</span>

                        <div className={cx('job-skills-list')}>
                            {job.skills.map((skill, index) => (
                                <span key={index} className={cx('job-skill-item')}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className={cx('btn-share-job')}>
                        <Share />
                        <span>Chia sẻ công việc</span>
                    </button>
                </div>
                <div className={cx('job-descs')}>
                    <div className={cx('job-desc-item')}>
                        <h4 className={cx('title-heading')}>Mô tả công việc</h4>
                        <p className={cx('job-desc-content')}>{job.desc}</p>
                    </div>
                    <div className={cx('job-desc-item')}>
                        <h4 className={cx('title-heading')}>Yêu cầu công việc</h4>
                        <p className={cx('job-desc-content')}>{job.requirement}</p>
                    </div>
                    <div className={cx('job-desc-item')}>
                        <h4 className={cx('title-heading')}>Thông tin khác</h4>
                        <p className={cx('job-desc-content')}>{job.anotherInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDesc;
