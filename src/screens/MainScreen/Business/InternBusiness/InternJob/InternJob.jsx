import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Add } from '@mui/icons-material';

import styles from './InternJob.module.scss';
import SearchBox from '../../../../../components/SearchBox';
import JobDesc from '../../../../JobDesc';
import JobItem from './JobItem';
import NewJob from './NewJob';

const cx = classNames.bind(styles);

const JOBS = [
    {
        id: 1,
        name: 'Front End Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU',
        skills: ['HTML', 'CSS', 'Javascript'],
        desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
        requirement:
            'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
        anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
        vacancies: 2,
    },
    {
        id: 2,
        name: 'Front End Developer',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkg-307JO6AHvZVx8999lW46CWnwCPcBqgMA&usqp=CAU',
        skills: ['HTML', 'CSS', 'Javascript'],
        desc: 'Chúng tôi đang tìm kiếm Lập trình viên Front End để tham gia phát triển dự án cùng nhóm chúng tôi. Các ứng viên nên có kiến thức chuyên môn tốt về HTML, CSS và Javascript. Kết hợp là việc thành thạo trong việc xây dựng cho các thiết bị tương thích khác.',
        requirement:
            'Ít nhất 2 năm kinh nghiệm phát triển Front End. Kiến thức chuyên môn sâu về các nguyên tắc thiết kế. Có khả năng cắt và chuyển từ Figma sang HTML. Kinh nghiệm với Version Control System như Git là một lợi thế.',
        anotherInfo: 'Làm việc từ: 11AM - 8PM. Trụ sở chính: 15 Nguyễn Lương Bằng, phường Tân Phú, quận 7, TPHCM',
        vacancies: 3,
    },
];

const InternJob = () => {
    const [chosedJob, setChosedJob] = useState({});
    const [openNewJobScreen, setOpenNewJobScreen] = useState(false);
    const [newJob, setNewJob] = useState({
        id: null,
        name: '',
        img: '',
        skills: [],
        desc: '',
        requirement: '',
        anotherInfo: '',
        vacancies: null,
    });
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setJobs(JOBS);
    }, []);

    useEffect(() => {
        if (newJob.id !== null) {
            setJobs((prev) => [...prev, newJob]);
        }
    }, [newJob]);

    return (
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
                    editable={true}
                    lastIndex={jobs[jobs.length - 1].id}
                />
            )}
        </div>
    );
};

export default InternJob;
