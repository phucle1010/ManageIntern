/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './JobDesc.module.scss';
import { Close, Share } from '@mui/icons-material';

import LoadingSpinner from '../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const JobDesc = ({ job, closeScreen, editable }) => {
    const [skills, setSkills] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [jobItem, setJobItem] = useState(job);

    useEffect(() => {
        axios
            .get('/business/job/skills/job_id', {
                params: {
                    job_id: job.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setSkills(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => alert(err));
    }, []);

    const handlePutJobDesc = async () => {
        await axios
            .put('/business/job/edit', jobItem)
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    closeScreen({});
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <Close className={cx('close-main-btn')} onClick={() => closeScreen({})} />
                    <h3 className={cx('main-heading')}>{job.job_name}</h3>
                    <div className={cx('job-general')}>
                        <div className={cx('job-summary')}>
                            <div className={cx('job-img')}>
                                <img src={job.image} alt="" />
                            </div>
                            <div className={cx('job-skills')}>
                                <span className={cx('title-heading', 'skills')}>Kĩ năng yêu cầu:</span>

                                <div className={cx('job-skills-list')}>
                                    {skills.map((skill, index) => (
                                        <span key={index} className={cx('job-skill-item')}>
                                            {skill.skill_name}
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
                                {editable ? (
                                    <textarea
                                        className={cx('input-item')}
                                        type="text"
                                        name="job_desc"
                                        value={jobItem.job_desc}
                                        onChange={(e) =>
                                            setJobItem((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]: e.target.value,
                                                };
                                            })
                                        }
                                        rows={5}
                                        spellCheck={false}
                                    />
                                ) : (
                                    <p className={cx('job-desc-content')}>{jobItem.job_desc}</p>
                                )}
                            </div>
                            <div className={cx('job-desc-item')}>
                                <h4 className={cx('title-heading')}>Yêu cầu công việc</h4>
                                {editable ? (
                                    <textarea
                                        className={cx('input-item')}
                                        type="text"
                                        name="requirements"
                                        value={jobItem.requirements}
                                        onChange={(e) =>
                                            setJobItem((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]: e.target.value,
                                                };
                                            })
                                        }
                                        rows={5}
                                        spellCheck={false}
                                    />
                                ) : (
                                    <p className={cx('job-desc-content')}>{jobItem.requirements}</p>
                                )}
                            </div>
                            <div className={cx('job-desc-item')}>
                                <h4 className={cx('title-heading')}>Thông tin khác</h4>
                                {editable ? (
                                    <textarea
                                        className={cx('input-item')}
                                        type="text"
                                        name="another_information"
                                        value={jobItem.another_information}
                                        onChange={(e) =>
                                            setJobItem((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]: e.target.value,
                                                };
                                            })
                                        }
                                        rows={3}
                                        spellCheck={false}
                                    />
                                ) : (
                                    <p className={cx('job-desc-content')}>{jobItem.another_information}</p>
                                )}
                            </div>
                            <div className={cx('job-desc-item')}>
                                <h4 className={cx('title-heading')}>Số lượng cần tuyển</h4>
                                {editable ? (
                                    <textarea
                                        className={cx('input-item')}
                                        type="text"
                                        name="vacancies"
                                        value={jobItem.vacancies}
                                        onChange={(e) =>
                                            setJobItem((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]: e.target.value,
                                                };
                                            })
                                        }
                                        rows={1}
                                        spellCheck={false}
                                    />
                                ) : (
                                    <p className={cx('job-desc-content')}>{jobItem.vacancies}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {editable && (
                        <button className={cx('btn-save')} onClick={handlePutJobDesc}>
                            Lưu thay đổi
                        </button>
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default JobDesc;
