import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SendRequest.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

const FOLLOWING_JOBS = [
    {
        id: 1,
        name: 'Front End Developer',
        img: '',
        major: 'Software Engineer',
        workplace: 'Tòa nhà Youngjin E&C Hải Phòng, Hồng Phong, An Dương, Hải Phòng, Việt Nam',
        company: 'Công Ty THH LG CNS Việt Nam',
        internTime: '4 tháng',
    },
    {
        id: 2,
        name: 'Back End Developer',
        img: '',
        major: 'Software Engineer',
        workplace: 'Tòa nhà Bonanza, 23 Duy Tân, Cầu Giấy, Hà Nội',
        company: 'Công Ty Sân Đình Games',
        internTime: '4 tháng',
    },
    {
        id: 3,
        name: 'React Native Developer',
        img: '',
        major: 'Software Engineer',
        workplace: 'P.514 Tòa nhà Toyota Mỹ Đình, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Hà Nội',
        company: 'Công Ty JMango360',
        internTime: '4 tháng',
    },
];

const SENT_JOBS_REQUEST = [
    {
        id: 1,
        name: 'Front End Developer',
        isSuccess: false,
        sentDate: '20-02-2023',
    },
    {
        id: 2,
        name: 'Back End Developer',
        isSuccess: true,
        sentDate: '10-04-2023',
    },
];

const SendRequest = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobs, setJobs] = useState([]);
    const token = JSON.parse(localStorage.getItem('user_token'));
    const [cv, setCv] = useState();

    const loadJob = () => {
        axios
            .get('/student/job/interested', {
                headers: {
                    'Authorization': token
                }
            })
            .then((res) => setJobs(res.data))
            .catch((err) => console.log(err));
    } 
    useEffect(() => {
        loadJob();
        console.log(jobs.data);
    }, []);

    const SendRequest = (job) => {
        const config = {
            headers: { Authorization: token }
          };
        axios
            .post(`/student/job/${job.id}`,{appriciationFile: cv}, config)
            .then((res) => alert('gui yeu cau thanh cong'))
            .catch((err) => console.log(err));

    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-category')}>
                <h4 className={cx('main-heading')}>Danh sách quan tâm</h4>
                <div className={cx('job-menu')}>
                    <span className={cx('job-menu-item')}>STT</span>
                    <span className={cx('job-menu-item')}>Tên công việc</span>
                    <span className={cx('job-menu-item')}>Lĩnh vực</span>
                    <span className={cx('job-menu-item')}>Công ty</span>
                    <span className={cx('job-menu-item')}>Lựa chọn</span>
                </div>
                <div className={cx('job-info-list')}>
                    {jobs.map((job, index) => (
                        <div key={job.id} className={cx('job-info-item')}>
                            <span className={cx('job-item')}>{index + 1}</span>
                            <span className={cx('job-item')}>{job.job_name}</span>
                            <span className={cx('job-item')}> Software Engineer</span>
                            <span className={cx('job-item')}>{job.username}</span>
                            <div className={cx('job-item')}>
                                <button className={cx('btn-choose')} onClick={() => setSelectedJob(job)}>
                                    Chọn
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('job-category')}>
                <h4 className={cx('main-heading')}>Danh sách yêu cầu đã gửi</h4>
                <div className={cx('request-list')}>
                    {SENT_JOBS_REQUEST.map((job, index) => (
                        <div key={index} className={cx('request-item')}>
                            <span>{job.name}</span>
                            <span>{job.sentDate}</span>
                            <span
                                className={cx({
                                    isActive: job.isSuccess === true,
                                    unActive: job.isSuccess === false,
                                })}
                            >
                                {job.isSuccess === true ? 'Thành công' : 'Thất bại'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

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
                            <span>{/*selectedJob.major*/} Software Engineer </span>
                        </div>
                        <div className={cx('chosed-job-item')}>
                            <h4>Địa điểm thực tập: </h4>
                            <span>{selectedJob.address}</span>
                        </div>
                        <div className={cx('chosed-job-item')}>
                            <h4>Thông tin công ty: </h4>
                            <span>{selectedJob.industry_sector}</span>
                        </div>
                        <div className={cx('chosed-job-item')}>
                            <h4>Thời gian thực tập: </h4>
                            <span>{selectedJob.requirements}</span>
                        </div>
                        <div className={cx('chosed-job-item')}>
                            <h4>CV: </h4>
                            <input type="file"  name="img"  onChange={(e) => {
                            const getbase64 = (file) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    setCv(reader.result);
                                };
                            };
                            if (e.target.files && e.target.files[0]) {
                                getbase64(e.target.files[0]);
                            }
                        }}/>
                        </div>
                        <div className={cx('options-btn')}>
                            <button className={cx('btn-regist')} onClick={() => SendRequest(selectedJob)}>
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
    );
};

export default SendRequest;
