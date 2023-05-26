/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Job.module.scss';
import { Delete, Star } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(styles);

const Job = ({ job, isLibrary, setChosedJob, setRemoveClicked }) => {
    const currentUser = useSelector((state) => state.user);
    const [studentId, setStudentId] = useState(null);
    const [isSavedJob, setIsSavedJob] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const getStudentId = async () => {
        await axios
            .get('/student/id_data/user_id', {
                params: {
                    user_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setStudentId(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getStudentId();
    }, []);

    const checkSavedJob = async () => {
        await axios
            .get('/student/job/store', {
                params: {
                    student_id: studentId,
                    job_id: job.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    if (res.data.responseData.length > 0) {
                        setIsSavedJob(true);
                    }
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        if (studentId !== null) {
            checkSavedJob();
            setLoaded(true);
        }
    }, [studentId]);

    const postJobToLibrary = async () => {
        await axios
            .post('/student/job/store/new', {
                student_id: studentId,
                job_id: job.id,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert(res.data.responseData);
                    setIsSavedJob(true);
                }
            })
            .catch((err) => alert(err));
    };

    const handleAddJobIntoLibrary = () => {
        if (!isSavedJob) {
            postJobToLibrary();
        }
    };

    const removeJob = async () => {
        await axios
            .delete('/student/job/library/delete/id', {
                params: {
                    student_id: studentId,
                    job_id: job.id,
                },
            })
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    setRemoveClicked(true);
                }
            });
    };

    const handleRemoveJobFromLibrary = () => {
        const notice = 'Bạn chắc chắn gỡ công việc này khỏi thư viện chứ ?';
        if (window.confirm(notice)) {
            removeJob();
        }
    };

    return (
        <React.Fragment>
            {loaded && (
                <div className={cx('wrapper')}>
                    <div className={cx('job-img')}>
                        <img src={job.image} alt="" />
                    </div>
                    <h4>{job.job_name}</h4>
                    <div className={cx('job-options')}>
                        {isLibrary === true ? (
                            <Delete className={cx('btn-delete')} onClick={handleRemoveJobFromLibrary} />
                        ) : (
                            <Star
                                className={cx('btn-save', {
                                    active: isSavedJob === true,
                                })}
                                onClick={handleAddJobIntoLibrary}
                            />
                        )}
                        <button
                            className={cx('btn-view')}
                            onClick={() => {
                                setChosedJob(job);
                            }}
                        >
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default Job;
