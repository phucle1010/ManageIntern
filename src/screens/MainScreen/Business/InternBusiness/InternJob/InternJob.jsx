/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import styles from './InternJob.module.scss';
import SearchBox from '../../../../../components/SearchBox';
import JobDesc from '../../../../JobDesc';
import JobItem from './JobItem';
import NewJob from './NewJob';
import LoadingSpinner from '../../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

// const JOBS = [
//     {
//         id: 1,
//         name: 'Front End Developer',
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
//         skills: ['HTML', 'CSS', 'Javascript'],
//         desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
//         requirement:
//             'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
//         anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
//         vacancies: 2,
//     },
//     {
//         id: 2,
//         name: 'Front End Developer',
//         img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
//         skills: ['HTML', 'CSS', 'Javascript'],
//         desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
//         requirement:
//             'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
//         anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
//         vacancies: 3,
//     },
// ];

const InternJob = () => {
    const initJob = {
        job_name: '',
        image: '',
        skills: [],
        job_desc: '',
        requirements: '',
        another_information: '',
        vacancies: null,
    };
    const currentUser = useSelector((state) => state.user);
    const [businessInfo, setBusinessInfo] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [chosedJob, setChosedJob] = useState({});
    const [openNewJobScreen, setOpenNewJobScreen] = useState(false);
    const [newJob, setNewJob] = useState(initJob);
    const [loaded, setLoaded] = useState(false);
    const [saveClicked, setSaveClicked] = useState(false);

    const getBusinessInfo = async () => {
        await axios
            .get('/business/info', {
                params: {
                    user_id: currentUser.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setBusinessInfo(res.data.responseData);
                }
            })
            .catch((err) => alert(err));
    };

    const getAllJobs = async () => {
        await axios
            .get('/business/jobs', {
                params: {
                    business_id: businessInfo.id,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setJobs(res.data.responseData);
                    setLoaded(true);
                    setSaveClicked(false);
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getBusinessInfo();
    }, []);

    useEffect(() => {
        if (businessInfo !== null) {
            getAllJobs();
        }
    }, [businessInfo]);

    useEffect(() => {
        if (saveClicked) {
            setNewJob(initJob);
            getAllJobs();
        }
    }, [saveClicked]);

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <h3 className={cx('main-heading')}>Danh sách các công việc đang tuyển dụng</h3>
                    <SearchBox className={cx('search')} />
                    <div className={cx('job-list')}>
                        {jobs.length > 0 &&
                            jobs.map((job, index) => <JobItem key={index} job={job} setChosedJob={setChosedJob} />)}
                        <div className={cx('btn-add')} onClick={() => setOpenNewJobScreen(true)}>
                            <Add className={cx('add-icon')} />
                        </div>
                    </div>
                    {Object.keys(chosedJob).length > 0 && <JobDesc job={chosedJob} closeScreen={setChosedJob} />}
                    {openNewJobScreen === true && (
                        <NewJob
                            openScreen={setOpenNewJobScreen}
                            setNewJob={setNewJob}
                            job={newJob}
                            editable={true}
                            setSaveClicked={setSaveClicked}
                            business_id={businessInfo.id}
                        />
                    )}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default InternJob;
