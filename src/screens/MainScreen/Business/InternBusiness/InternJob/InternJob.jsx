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
    const [editable, setEditable] = useState(true);

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
    }, [businessInfo, chosedJob]);

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
                    {/* <SearchBox className={cx('search')} /> */}
                    <div className={cx('job-list')}>
                        {jobs.length > 0 &&
                            jobs.map((job, index) => (
                                <JobItem key={index} job={job} setChosedJob={setChosedJob} setEditable={setEditable} />
                            ))}
                        <div className={cx('btn-add')} onClick={() => setOpenNewJobScreen(true)}>
                            <Add className={cx('add-icon')} />
                        </div>
                    </div>
                    {Object.keys(chosedJob).length > 0 && (
                        <JobDesc job={chosedJob} closeScreen={setChosedJob} editable={editable} />
                    )}
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
