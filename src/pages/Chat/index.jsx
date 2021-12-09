import React, { useEffect, createContext } from "react";
import { withRouter } from "react-router";
import { Messages, ChatInput, Status } from "containers";
import { SideBar } from "containers";
import { dialogsActions } from "redux/actions";
import { connect } from "react-redux";
import useWindowSize from "../../utils/useWindowSize";
import Modal from "react-modal";
import "./Chat.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const ModalContext = createContext();

const Chat = (props) => {
  const { setCurrentDialogId, user, currentDialog } = props;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    const {
      location: { pathname },
    } = props;
    const dialogId = pathname.split("/");
    setCurrentDialogId(dialogId[3]);
  }, [props, props.location.pathname, setCurrentDialogId]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { width } = useWindowSize();

  return (
    <div className="chat">
      <ModalContext.Provider value={{modalIsOpen,setIsOpen}}>
        {width <= 768 ? (
          <>
            {!currentDialog && <SideBar />}
            <div onClick={openModal} className="open-dialogs">
              Dialogs
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <SideBar closeModal={closeModal} />
            </Modal>
          </>
        ) : (
          <SideBar />
        )}
        {user && currentDialog && (
          <div className="chat__dialog">
            <Status openModal={openModal} online />
            <Messages />
            <div className="chat__dialog-input">
              <ChatInput />
            </div>
          </div>
        )}
      </ModalContext.Provider>
    </div>
  );
};

export default withRouter(
  connect(
    ({ user, dialogs }) => ({
      user: user.data,
      currentDialog: dialogs.currentDialogId,
    }),
    dialogsActions
  )(Chat)
);
