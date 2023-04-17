import React from 'react';
import classNames from 'classnames/bind';
import styles from './Report.module.scss';
import { AttachFile } from '@mui/icons-material';

const cx = classNames.bind(styles);

const TODO_LIST = [
    {
        id: 1,
        name: 'Tham gia thảo luận phát triển dự án',
        startDay: '20-03-2023',
        endDay: '31-03-2023',
        isCompleted: true,
    },
    {
        id: 2,
        name: 'Tham gia xây dựng UI cho ứng dụng',
        startDay: '01-04-2023',
        endDay: '12-04-2023',
        isCompleted: false,
    },
];

const Report = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('report-category')}>
                <h4 className={cx('main-heading')}>Báo cáo tiến độ</h4>
                <h5 className={cx('sub-heading')}>Danh sách các công việc</h5>
                <div className={cx('todo-list')}>
                    {TODO_LIST.map((todo, index) => (
                        <div key={index} className={cx('todo-item')}>
                            <div className={cx('todo-name')}>
                                <input type="checkbox" checked={todo.isCompleted} />
                                <span>{todo.name}</span>
                            </div>
                            <div className={cx('todo-deadline')}>
                                <div className={cx('deadline-info')}>
                                    <h5>Ngày bắt đầu: </h5>
                                    <span>{todo.startDay}</span>
                                </div>
                                <div className={cx('deadline-info')}>
                                    <h5>Ngày kết thúc: </h5>
                                    <span>{todo.endDay}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('report-category')}>
                <h4 className={cx('main-heading')}>Báo cáo cuối kì</h4>
                <div className={cx('intern-detail')}>
                    <input className={cx('intern-input')} type="text" placeholder="File báo cáo" readOnly={true} />
                    <input type="file" id={cx('gif-input')} />
                    <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                        <AttachFile className={cx('gif-btn')} htmlFor={cx('gif-input')} />
                    </label>
                </div>
                <div className={cx('intern-detail')}>
                    <input
                        className={cx('intern-input')}
                        type="text"
                        placeholder="Phiếu đánh giá quá trình thực tập sinh viên của công ty"
                        readOnly={true}
                    />
                    <input type="file" id={cx('gif-input')} />
                    <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                        <AttachFile className={cx('gif-btn')} />
                    </label>
                </div>
                <div className={cx('intern-detail')}>
                    <input
                        className={cx('intern-input')}
                        type="text"
                        placeholder="Phiếu đánh giá quá trình thực tập sinh viên của giảng viên"
                        readOnly={true}
                    />
                    <input type="file" id={cx('gif-input')} />
                    <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                        <AttachFile className={cx('gif-btn')} />
                    </label>
                </div>
            </div>

            <div className={cx('option')}>
                <button className={cx('btn-submit')}>Nộp bài</button>
            </div>
        </div>
    );
};

export default Report;
