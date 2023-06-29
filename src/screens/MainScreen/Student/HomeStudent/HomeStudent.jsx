/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './HomeStudent.module.scss';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import SearchBox from '../../../../components/SearchBox';
import Job from '../../../../components/Job';
import JobDesc from '../../../JobDesc';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const MAXIMUM_JOBS_EACH_PAGE = 5;

const HomeStudent = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [numberPages, setNumberPages] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [chosedJob, setChosedJob] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [searchJob, setSearchJob] = useState(null);

    const getNumberOfPages = useCallback((list) => {
        if (list.length % MAXIMUM_JOBS_EACH_PAGE === 0) {
            return list.length / MAXIMUM_JOBS_EACH_PAGE;
        }
        return Math.ceil(list.length / MAXIMUM_JOBS_EACH_PAGE);
    });

    useEffect(() => {
        axios
            .get('/student/job/all', {params: {searchJob}})
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setJobs(res.data.responseData);
                    setLoaded(true);
                }
            })
            .catch((err) => alert(err));
    }, [searchJob]);

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
                    <h3 className={cx('title-heading')}>TRANG CHỦ</h3>
                    <SearchBox className={cx('search')} search={searchJob} setSearch={setSearchJob} />
                    <div className={cx('job-category')}>
                        <h4 className={cx('list-heading')}>Danh sách công việc</h4>
                        <div className={cx('job-list')}>
                            {jobs.length > 0 &&
                                jobs.map(
                                    (job, index) =>
                                        isDisplayedItemOnPage(index) === true && (
                                            <Job job={job} key={job.id} setChosedJob={setChosedJob} isLibrary={false} />
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
                    <div className={cx('job-category')}>
                        <h4 className={cx('list-heading')}>Gợi ý công việc</h4>
                        <div className={cx('job-list', 'horizontal-display')}>
                            {jobs.length > 0 &&
                                jobs.map(
                                    (job) =>
                                        job.isTip === true && (
                                            <Job job={job} key={job.id} setChosedJob={setChosedJob} isLibrary={false} />
                                        ),
                                )}
                        </div>
                    </div>
                    <div className={cx('job-category')}>
                        <h4 className={cx('list-heading')}>Công việc xu hướng</h4>
                        <div className={cx('job-list', 'horizontal-display')}>
                            {jobs.length > 0 &&
                                jobs.map(
                                    (job) =>
                                        job.isTrending === true && (
                                            <Job
                                                job={job}
                                                key={job.id}
                                                setChosedJob={setChosedJob}
                                                isLibrary={false}
                                                setRemoveClicked={() => {}}
                                            />
                                        ),
                                )}
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

export default HomeStudent;
