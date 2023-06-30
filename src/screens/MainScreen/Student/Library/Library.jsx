/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Library.module.scss';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import SearchBox from '../../../../components/SearchBox';
import Job from '../../../../components/Job';
import JobDesc from '../../../JobDesc';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const MAXIMUM_JOBS_EACH_PAGE = 5;

const Library = () => {
    const currentUser = useSelector((state) => state.user);
    const [currentPage, setCurrentPage] = useState(0);
    const [numberPages, setNumberPages] = useState(0);
    const [studentId, setStudentId] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [chosedJob, setChosedJob] = useState({});
    const [removeClicked, setRemoveClicked] = useState(false);
    const [search, setSearch] = useState(null);

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

    const getAllJobInLibrary = async () => {
        await axios
            .get('/student/job/library/all', {
                params: {
                    student_id: studentId,
                    search,
                },
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setJobs(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        if (studentId !== null) {
            getAllJobInLibrary();
        }
    }, [studentId, search]);

    useEffect(() => {
        if (removeClicked) {
            getAllJobInLibrary();
            setRemoveClicked(false);
        }
    }, [removeClicked]);

    const getNumberOfPages = useCallback((list) => {
        if (list.length % MAXIMUM_JOBS_EACH_PAGE === 0) {
            return list.length / MAXIMUM_JOBS_EACH_PAGE;
        }
        return Math.ceil(list.length / MAXIMUM_JOBS_EACH_PAGE);
    }, []);

    useEffect(() => {
        if (jobs.length > 0) {
            setNumberPages(getNumberOfPages(jobs));
        }
    }, [jobs]);

    const isDisplayedItemOnPage = (index) =>
        index <= (currentPage + 1) * MAXIMUM_JOBS_EACH_PAGE - 1 && index >= currentPage * MAXIMUM_JOBS_EACH_PAGE;

    return (
        <React.Fragment>
            {loaded ? (
                <div className={cx('wrapper')}>
                    <h3 className={cx('title-heading')}>THƯ VIỆN</h3>
                    <SearchBox className={cx('search')} search={search} setSearch={setSearch} />
                    <div className={cx('job-category')}>
                        <h4 className={cx('list-heading')}>Danh sách công việc đã lưu</h4>
                        <div className={cx('job-list')}>
                            {jobs.length > 0 &&
                                jobs.map(
                                    (job, index) =>
                                        isDisplayedItemOnPage(index) === true && (
                                            <Job
                                                job={job}
                                                key={job.id}
                                                setChosedJob={setChosedJob}
                                                isLibrary={true}
                                                setRemoveClicked={setRemoveClicked}
                                            />
                                        ),
                                )}
                        </div>
                        <div className={cx('pagination')}>
                            <ArrowLeft
                                className={cx('btn-navigate')}
                                onClick={() => currentPage >= 1 && setCurrentPage((prev) => prev - 1)}
                            />
                            <span className={cx('current-page')}>{currentPage + 1}</span>
                            <ArrowRight
                                className={cx('btn-navigate')}
                                onClick={() => currentPage <= numberPages - 2 && setCurrentPage((prev) => prev + 1)}
                            />
                        </div>
                    </div>
                    {Object.keys(chosedJob).length > 0 && <JobDesc closeScreen={setChosedJob} job={chosedJob} />}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </React.Fragment>
    );
};

export default Library;
