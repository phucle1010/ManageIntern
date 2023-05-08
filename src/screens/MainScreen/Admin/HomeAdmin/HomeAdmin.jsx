import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';

import SearchBox from '../../../../components/SearchBox';
import NewProgram from './NewProgram';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const HomeAdmin = () => {
    const admin = useSelector((state) => state.user);
    const [school, setSchool] = useState({});
    const [programs, setPrograms] = useState([]);
    const [chosedProgram, setChosedProgram] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const email = admin.email;
        axios
            .get('/admin/school', {
                params: {
                    email,
                },
            })
            .then((res) => {
                setSchool(res.data.responseData);
            });
    }, [admin.email]);

    useEffect(() => {
        if (Object.keys(school).length !== 0) {
            axios
                .get('/admin/program', {
                    params: {
                        schoolId: school.id,
                    },
                })
                .then((res) => {
                    setPrograms(res.data.responseData);
                })
                .then(() => setIsLoading(false));
        }
    }, [chosedProgram, school]);

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title-heading')}>TRANG CHỦ</h3>
            <SearchBox className={cx('search')} />
            <h4 className={cx('list-heading')}>Danh sách chương trình học</h4>
            {isLoading === true ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className={cx('program-list')}>
                        {programs.length !== 0 &&
                            programs.map((program, index) => (
                                <div key={index} className={cx('program-item')}>
                                    <h4 className={cx('program-name')}>{program.program_name}</h4>
                                    <h3 className={cx('program-school')}>{school.school_name}</h3>
                                    <button className={cx('btn-add', 'edit')} onClick={() => setChosedProgram(program)}>
                                        Chỉnh sửa
                                    </button>
                                </div>
                            ))}
                    </div>
                    <button
                        className={cx('btn-add')}
                        onClick={() =>
                            setChosedProgram({
                                id: null,
                                program_name: '',
                                school_id: school.id,
                            })
                        }
                    >
                        Thêm mới
                    </button>
                </>
            )}

            {Object.keys(chosedProgram).length !== 0 && (
                <NewProgram show={setChosedProgram} program={chosedProgram} editable={true} school={school} />
            )}
        </div>
    );
};

export default HomeAdmin;
