import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import './Home.scss';
import { Messages, ChatInput, Status } from 'containers';
import {  SideBar } from 'containers';
import { dialogsActions } from 'redux/actions';
import { connect } from "react-redux";

const Home = props => {
    const { setCurrentDialogId } = props;

    useEffect(() => {
        const { location: { pathname } } = props;
        const dialogId = pathname.split('/').pop();
        setCurrentDialogId(dialogId);
    }, [props.location.pathname]);
    
    return (
    <section className="home">
        <div className="chat">
            <SideBar/>
            <div className="chat__dialog">    
                    <Status online />
                <div className="chat__dialog-messages">
                   <Messages />                   
                </div>
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
            </div>
        </div>
     </section>
    );
};

export default withRouter(connect(
    ({ dialogs }) => dialogs,
    dialogsActions
  )(Home));