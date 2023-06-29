/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Report.module.scss';
import { AttachFile } from '@mui/icons-material';

import Loading from '../../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const TodoItem = ({ todo, getAllTodos }) => {
    const [isCompleted, setIsCompleted] = useState(
        todo.completed_status.data[0] === 1 && new Date() < new Date(Date.parse(todo.end_date)) ? true : false,
    );
    const [clickedCheck, setClickedCheck] = useState(false);

    const formatedDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}/${convertedDate.getMonth() + 1}/${convertedDate.getUTCFullYear()}`;
    };

    const handleUpdateComplete = async () => {
        await axios
            .put('/student/todo/complete', {
                id: todo.id,
                end_date: todo.end_date,
            })
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    getAllTodos();
                    setClickedCheck(false);
                }
            })
            .catch((err) => alert(err));
    };

    const handleCompleteTodo = (e) => {
        if (e.target.checked) {
            setIsCompleted(e.target.checked);
            setClickedCheck(true);
        }
    };

    useEffect(() => {
        if (clickedCheck) {
            handleUpdateComplete();
        }
    }, [clickedCheck]);

    return (
        <div
            className={cx('todo-item', {
                expired:
                    todo.out_of_expire.data[0] === 1 ||
                    (todo.completed_status.data[0] === 0 && new Date() > new Date(Date.parse(todo.end_date))),
                active: todo.completed_status.data[0] === 0 && new Date() < new Date(Date.parse(todo.end_date)),
            })}
        >
            <div className={cx('todo-name')}>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    value={isCompleted}
                    onChange={handleCompleteTodo}
                    disabled={isCompleted}
                />
                <span
                    style={{
                        textDecoration: isCompleted ? 'line-through' : 'none',
                    }}
                >
                    {todo.todo_name}
                </span>
            </div>
            <div className={cx('todo-deadline')}>
                <div className={cx('deadline-info')}>
                    <h5>Ngày bắt đầu: </h5>
                    <span>{formatedDate(todo.start_date)}</span>
                </div>
                <div className={cx('deadline-info')}>
                    <h5>Ngày kết thúc: </h5>
                    <span>{formatedDate(todo.end_date)}</span>
                </div>
            </div>
            <div
                className={cx('todo-status', {
                    completed: todo.completed_status.data[0] === 1 && new Date() < new Date(Date.parse(todo.end_date)),
                })}
            >
                {todo.completed_status.data[0] === 1 && new Date() < new Date(Date.parse(todo.end_date))
                    ? 'Hoàn thành'
                    : 'Đang thực hiện'}
            </div>
        </div>
    );
};

const Report = () => {
    const user = useSelector((state) => state.user);
    const [studentId, setStudentId] = useState(null);
    const [todos, setTodos] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getStudentId = async () => {
        await axios
            .get('/student/id_data/user_id', {
                params: {
                    user_id: user.id,
                },
            })
            .then((res) => res.data.statusCode === 200 && setStudentId(res.data.responseData))
            .catch((err) => alert(err));
    };

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            getStudentId();
        }
    }, [user]);

    const getAllTodos = async () => {
        await axios
            .get('/student/todo/all', {
                params: {
                    student_id: studentId,
                },
            })
            .then((res) => {
                res.data.statusCode === 200 && setTodos(res.data.responseData);
                setLoaded(true);
            })
            .catch((err) => alert(err));
    };

    useEffect(() => {
        if (studentId !== null) {
            getAllTodos();
        }
    }, [studentId]);

        // send file

    const [result_file, setResultFile] = useState(null);
    const [result_business_file, setResultBusinessFile] = useState(null);
    const [result_teacher_file, setResultTeacherFile] = useState(null);

    const handleDocxFileChange = async (event, setDocx) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        console.log(base64);
        setDocx(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const saveReport = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .post(`/student/report`, {result_file, result_business_file, result_teacher_file}, {headers: {'authorization': token}})
            .then((res) => alert('Cập nhật thành công'))
            .catch((err) => console.log(err));
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('report-category')}>
                <h4 className={cx('main-heading')}>Báo cáo tiến độ</h4>
                <h5 className={cx('sub-heading')}>Danh sách các công việc</h5>
                {loaded ? (
                    <div className={cx('todo-list')}>
                        {todos.length > 0 &&
                            todos.map((todo, index) => <TodoItem todo={todo} key={index} getAllTodos={getAllTodos} />)}
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
            <div className={cx('report-category')}>
                <h4 className={cx('main-heading')}>Báo cáo cuối kì</h4>
                <div className={cx('intern-detail')}>
                    <input className={cx('intern-input')} type="text" placeholder="File báo cáo" readOnly={true} value={result_file}/>
                    <input type="file" id={cx('gif-input-report')} accept=".docx" onChange={(e) => handleDocxFileChange(e, setResultFile)}/>
                    <label htmlFor={cx('gif-input-report')} className={cx('gif-label')}>
                        <AttachFile className={cx('gif-btn')} htmlFor={cx('gif-input')} />
                    </label>
                </div>
                <div className={cx('intern-detail')}>
                    <input
                        className={cx('intern-input')}
                        type="text"
                        placeholder="Phiếu đánh giá quá trình thực tập sinh viên của công ty"
                        readOnly={true}
                        value={result_business_file}
                    />
                    <input type="file" id={cx('gif-input-business')} accept=".docx" onChange={(e) => handleDocxFileChange(e, setResultBusinessFile)}/>
                    <label htmlFor={cx('gif-input-business')} className={cx('gif-label')}>
                        <AttachFile className={cx('gif-btn')} />
                    </label>
                </div>
                <div className={cx('intern-detail')}>
                    <input
                        className={cx('intern-input')}
                        type="text"
                        placeholder="Phiếu đánh giá quá trình thực tập sinh viên của giảng viên"
                        readOnly={true}
                        value={result_teacher_file}
                    />
                    <input type="file" id={cx('gif-input-teacher')} accept=".docx" onChange={(e) => handleDocxFileChange(e, setResultTeacherFile)}/>
                    <label htmlFor={cx('gif-input-teacher')} className={cx('gif-label')}>
                        <AttachFile className={cx('gif-btn')} />
                    </label>
                </div>
            </div>

            <div className={cx('option')}>
                <button className={cx('btn-submit')} onClick={() => saveReport()}>Nộp bài</button>
            </div>
        </div>
    );
};

export default Report;
