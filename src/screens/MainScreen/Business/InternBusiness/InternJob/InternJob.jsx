import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Add } from '@mui/icons-material';

import styles from './InternJob.module.scss';
import SearchBox from '../../../../../components/SearchBox';
import JobDesc from '../../../../JobDesc';
import JobItem from './JobItem';
import NewJob from './NewJob';
import axios from 'axios';

const cx = classNames.bind(styles);

const InternJob = () => {
    const [jobsopen, setJobsOpen] = useState([]); 
    const [chosedJob, setChosedJob] = useState({});
    const [openNewJobScreen, setOpenNewJobScreen] = useState(false);
    const token = JSON.parse(localStorage.getItem('user_token'));
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

    useEffect(() => {
        axios
            .get(`/business/job`, {headers: {
                Authorization:  token,
            }})
            .then((res) => {
                setJobsOpen(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('main-heading')}>Danh sách các công việc đang tuyển dụng</h3>
            <SearchBox className={cx('search')} />
            <div className={cx('job-list')}>
                {jobsopen.length > 0 &&
                    jobsopen.map((job, index) => <JobItem key={index} job={job} setChosedJob={setChosedJob} />)}
                <div className={cx('btn-add')} onClick={() => setOpenNewJobScreen(true)}>
                    <Add className={cx('add-icon')} />
                </div>
            </div>
            {Object.keys(chosedJob).length > 0 && <JobDesc job={chosedJob} closeScreen={setChosedJob} />}
            {openNewJobScreen === true && (
                <NewJob
                    openScreen={setOpenNewJobScreen}
                    setNewJob={setNewJob}
                    newJob={newJob}
                    editable={true}
                    lastIndex={1}
                />
            )}
        </div>
    );
};

export default InternJob;
