/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SendRequest.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../../../../components/LoadingSpinner/LoadingSpinner';

const cx = classNames.bind(styles);

const SendRequest = () => {
    const currentUser = useSelector((state) => state.user);
    const [studentId, setStudentId] = useState(null);
    const [careJobs, setCareJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [registRequests, setRegistRequests] = useState([]);
    // const [requestJob, setRequestJob] = useState([]);
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

    const getCareJobs = async () => {
        await axios
            .get('/student/job/care', {
                params: {
                    student_id: studentId,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setCareJobs(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    const getRegistRequests = async () => {
        await axios
            .get('/student/intern/job/regist/all', {
                params: {
                    student_id: studentId,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setRegistRequests(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    // const getRequestsJob = async () => {
    //     await axios
    //         .get('/student/intern/job/request', {
    //             params: {
    //                 student_id: studentId,
    //             },
    //         })
    //         .then((res) => {
    //             if (res.data.statusCode === 200) {
    //                 setRequestJob(res.data.responseData);
    //             }
    //         })
    //         .catch((err) => alert(err));
    // };

    useEffect(() => {
        if (studentId !== null) {
            getCareJobs();
            getRegistRequests();
            // getRequestsJob();
            setLoaded(true);
        }
    }, [studentId]);

    const handleSendJobInformation = async () => {
        await axios
            .post('/student/intern/job/regist/new', {
                student_id: studentId,
                job_id: selectedJob.job_id,
            })
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    getRegistRequests();
                    setSelectedJob(null);
                }
            })
            .catch((err) => alert(err));
    };

    const handleRemoveRequest = async (request_id, regist_submit_status) => {
        const SUCCESS_STATUS = 1;
        if (regist_submit_status === SUCCESS_STATUS) {
            alert('Bạn không thể gỡ yêu cầu đã được xác nhận thành công');
        } else {
            const notice = 'Bạn chắc chắn gỡ yêu cầu thông tin công việc này chứ ?';
            if (window.confirm(notice)) {
                await axios
                    .delete('/student/intern/job/regist/id', {
                        params: {
                            request_id,
                        },
                    })
                    .then((res) => {
                        alert(res.data.responseData);
                        if (res.data.statusCode === 200) {
                            getRegistRequests();
                        }
                    })
                    .catch((err) => alert(err));
            }
        }
    };

    const formatDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}/${convertedDate.getMonth() + 1}/${convertedDate.getUTCFullYear()}`;
    };

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <div className={cx('job-category')}>
                        <h4 className={cx('main-heading')}>Danh sách quan tâm</h4>
                        <div className={cx('job-menu')}>
                            <span className={cx('job-menu-item')}>STT</span>
                            <span className={cx('job-menu-item')}>Tên công việc</span>
                            <span className={cx('job-menu-item')}>Công ty</span>
                            <span className={cx('job-menu-item')}>Lĩnh vực hoạt động</span>
                            <span className={cx('job-menu-item')}>Lựa chọn</span>
                        </div>
                        <div className={cx('job-info-list')}>
                            {careJobs.length > 0 &&
                                careJobs.map((job, index) => (
                                    <div key={index} className={cx('job-info-item')}>
                                        <span className={cx('job-item')}>{index + 1}</span>
                                        <span className={cx('job-item')}>{job.job_name}</span>
                                        <span className={cx('job-item')}>{job.company_name}</span>
                                        <span className={cx('job-item')}> {job.industry_sector}</span>
                                        <div className={cx('job-item')}>
                                            <button className={cx('btn-choose')} onClick={() => setSelectedJob(job)}>
                                                Chọn
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    {registRequests.length > 0 && (
                        <div className={cx('job-category')}>
                            <h4 className={cx('main-heading')}>Danh sách yêu cầu đã gửi đến Quản lý</h4>
                            <div className={cx('request-list')}>
                                {registRequests.map((request, index) => (
                                    <div key={index} className={cx('request-item')}>
                                        <span>
                                            <b>Vị trí công việc: </b>
                                            {request.job_name}
                                        </span>
                                        <span>
                                            <b>Công ty: </b>
                                            {request.company_name}
                                        </span>
                                        <span>
                                            <b>Ngày gửi yêu cầu: </b>
                                            {formatDate(request.regist_date)}
                                        </span>
                                        <span
                                            className={cx({
                                                isActive: request.regist_submit_status === 1,
                                                unActive: request.regist_submit_status === 0,
                                                isPending: request.regist_submit_status === 2,
                                            })}
                                        >
                                            <b>Trạng thái xác nhận:</b>
                                            <span>
                                                {request.regist_submit_status === 1
                                                    ? 'Thành công'
                                                    : request.regist_submit_status === 0
                                                    ? 'Thất bại'
                                                    : 'Đang chờ'}
                                            </span>
                                        </span>
                                        <span>
                                            {request.regist_submit_status === 0 && (
                                                <button
                                                    className={cx('btn-destroy')}
                                                    onClick={() =>
                                                        handleRemoveRequest(request.id, request.regist_submit_status)
                                                    }
                                                >
                                                    Gỡ yêu cầu
                                                </button>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* UI gửi yêu cầu tới doanh nghiệp */}

                    {/* {registRequests.length > 0 && (
                        <div className={cx('job-category')}>
                            <h4 className={cx('main-heading')}>Danh sách yêu cầu đã gửi đến Doanh nghiệp</h4>
                            <div className={cx('request-list')}>
                                {registRequests.map((request, index) => (
                                    <div key={index} className={cx('request-item')}>
                                        <span>
                                            <b>Vị trí công việc: </b>
                                            {request.job_name}
                                        </span>
                                        <span>
                                            <b>Công ty: </b>
                                            {request.company_name}
                                        </span>
                                        <span>
                                            <b>Ngày gửi yêu cầu: </b>
                                            {formatDate(request.regist_date)}
                                        </span>
                                        <span
                                            className={cx({
                                                isActive: request.regist_submit_status === 1,
                                                unActive: request.regist_submit_status === 0,
                                                isPending: request.regist_submit_status === 2,
                                            })}
                                        >
                                            <b>Trạng thái xác nhận:</b>
                                            <span>
                                                {request.regist_submit_status === 1
                                                    ? 'Thành công'
                                                    : request.regist_submit_status === 0
                                                    ? 'Thất bại'
                                                    : 'Đang chờ'}
                                            </span>
                                        </span>
                                        <span>
                                            <button
                                                className={cx('btn-destroy')}
                                                onClick={() =>
                                                    handleRemoveRequest(request.id, request.regist_submit_status)
                                                }
                                            >
                                                Gỡ yêu cầu
                                            </button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} */}

                    {selectedJob !== null && (
                        <div className={cx('job-category')}>
                            <h4 className={cx('main-heading')}>Công việc đã chọn</h4>
                            <div className={cx('chosed-job')}>
                                <div className={cx('chosed-job-item')}>
                                    <h4>Tên công việc: </h4>
                                    <span>{selectedJob.job_name}</span>
                                </div>
                                <div className={cx('chosed-job-item')}>
                                    <h4>Lĩnh vực: </h4>
                                    <span>Công nghệ thông tin</span>
                                </div>
                                <div className={cx('chosed-job-item')}>
                                    <h4>Mô tả công việc: </h4>
                                    <span>{selectedJob.job_desc}</span>
                                </div>
                                <div className={cx('chosed-job-item')}>
                                    <h4>Thông tin công ty: </h4>
                                    <span>{selectedJob.company_name}</span>
                                </div>
                                <div className={cx('options-btn')}>
                                    <button className={cx('btn-regist')} onClick={handleSendJobInformation}>
                                        Gửi yêu cầu
                                    </button>
                                    <button className={cx('btn-cancel')} onClick={() => setSelectedJob(null)}>
                                        Hủy bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default SendRequest;
