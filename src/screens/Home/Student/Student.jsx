import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Student.module.scss';
import Menu from '../../../components/Menu';
import { MenuContext } from '../Home';

import HomeStudent from '../../MainScreen/Student/HomeStudent';
import Library from '../../MainScreen/Student/Library';
import Intern from '../../MainScreen/Student/Intern';
import Chat from '../../MainScreen/Student/Chat';
import AccountStudent from '../../MainScreen/Student/AccountStudent';
import ChatBot from '../../../components/ChatBot';

const cx = classNames.bind(styles);

const HOME_STUDENT = 'Trang chủ';
const LIBRARY = 'Thư viện';
const INTERN = 'Thực tập';
const CHAT = 'Trao đổi';
const ACCOUNT_STUDENT = 'Tài khoản';

const Student = ({ ...props }) => {
    const [clickedChatbot, setClickedChatbot] = useState(false);
    const { minimizeMenu } = useContext(MenuContext);
    const { setMinimizeMenu, selectedSectionItem, setSelectedSectionItem } = props;

    let MainSection = null;

    (function () {
        switch (selectedSectionItem.name) {
            case HOME_STUDENT:
                MainSection = HomeStudent;
                break;
            case LIBRARY:
                MainSection = Library;
                break;
            case INTERN:
                MainSection = Intern;
                break;
            case CHAT:
                MainSection = Chat;
                break;
            case ACCOUNT_STUDENT:
                MainSection = AccountStudent;
                break;
            default:
                break;
        }
    })();

    return (
        <div className={cx('wrapper')}>
            <Menu
                setMinimizeMenu={setMinimizeMenu}
                setSelectedSectionItem={setSelectedSectionItem}
                selectedSectionItem={selectedSectionItem}
            />
            <div
                className={cx('section', {
                    maximizeSection: minimizeMenu,
                })}
            >
                {MainSection !== null && (
                    <React.Fragment>
                        <MainSection />
                        <div className={cx('chatbot')} onClick={() => setClickedChatbot(true)}>
                            <img
                                src="https://freepngimg.com/save/97427-logo-chat-png-file-hd/640x492"
                                alt=""
                                className={cx('chatbot-icon')}
                            />
                        </div>
                        {clickedChatbot && <ChatBot open={setClickedChatbot} />}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default Student;
