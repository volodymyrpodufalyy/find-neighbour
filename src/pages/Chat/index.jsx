import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { Messages, ChatInput, Status } from 'containers';
import {  SideBar } from 'containers';
import { dialogsActions } from 'redux/actions';
import { connect } from "react-redux";
import "./Chat.scss"

const Chat = props => {
    const { setCurrentDialogId, user } = props;

    useEffect(() => {
        const { location: { pathname } } = props;
        const parts = pathname.split('/');
        const dialogId = parts[3];
        setCurrentDialogId(dialogId);
    }, [props, props.location.pathname, setCurrentDialogId]);
    
    return (
        <div className="chat">
            <SideBar/>
            {user && ( <div className="chat__dialog">    
                    <Status online />
                   <Messages />                   
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
            </div>)}
        </div>
    );
};

export default withRouter(connect(
    ({ user }) => ({ user: user.data }),
    dialogsActions
  )(Chat));