import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Appreciation.module.scss';
import { Close, Send } from '@mui/icons-material';

import Loading from '../../../../../../components/LoadingSpinner';

const cx = classNames.bind(styles);

const Appreciation = ({ setSelectedTodo, todo }) => {
    const formattedDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        return `${convertedDate.getDate()}/${convertedDate.getMonth() + 1}/${convertedDate.getUTCFullYear()}`;
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => setSelectedTodo(null)} />
            <h3 className={cx('title-heading')}>{todo.todo_name}</h3>
            <div className={cx('deadline-info')}>
                <span>
                    <b>Ngày bắt đầu: </b>
                    {`${formattedDate(todo.start_date)}`}
                </span>
                <span>
                    <b>Ngày kết thúc: </b>
                    {`${formattedDate(todo.end_date)}`}
                </span>
            </div>
        </div>
    );
};

export default Appreciation;
