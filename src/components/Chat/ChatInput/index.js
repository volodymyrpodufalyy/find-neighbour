import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SmileOutlined, LoadingOutlined, 
  CameraOutlined, AudioOutlined,
  SendOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './ChatInput.scss';
import { Input,Button } from 'antd';
import { UploadField } from '@navjobs/upload';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { UploadFiles } from 'components';

const { TextArea } = Input;

const ChatInput = props => {
    const {
      emojiPickerVisible, 
      value, 
      setValue, 
      toggleEmojiPicker,
      handleSendMessage,
      addEmoji,
      sendMessage,
      attachments,
      onSelectFiles,
      onRecord,
      isRecording,
      removeAttachment,
      onHideRecording,
      isLoading } = props;


    return (    
      <Fragment>
                <div className="chat-input">
        <div>
        <div className="chat-input__smile-btn">
        <div className="chat-input__emoji-picker">
        {emojiPickerVisible &&  (
                <Picker onSelect={(e) => setValue(value + e.native)} set='apple' />
            )}
            </div>
        <Button onClick={toggleEmojiPicker} icon={<SmileOutlined />}/>
        </div>
        {isRecording ? (<div className="chat-input__record-status">
                <i className="chat-input__record-status-bubble"></i>
              Recording...
              <Button className="stop-recording" onClick={onHideRecording} icon={<CloseCircleOutlined />}/>
            </div>) :
        ( <TextArea
         onChange={e => setValue(e.target.value)}
         onKeyUp={handleSendMessage}
         size="large"
         placeholder="Введіть текст повідомлення…"
         value={value}
         autoSize={{ minRows: 1, maxRows: 6 }}
          />
          )}
        <div className="chat-input__actions"> 
            <UploadField onFiles={onSelectFiles}
             containerProps={{ className: 'chat-input__actions-upload-btn' }} 
             uploadProps={{
                  accept: '.jpg,.png,.jpeg', 
                  multiple: "multiple"
                }}
              >
            <div>
            <Button icon={<CameraOutlined />}/>
            </div>
        </UploadField>
            {isLoading ? <LoadingOutlined /> :
             isRecording || value || attachments.length ? (
            <Button onClick={sendMessage} icon={<SendOutlined />}/>
            ) :
            (<div className="chat-input__record-btn">
              <Button onClick={onRecord} icon={<AudioOutlined />}/>
            </div>)}
        </div>
        </div>
        <div className="chat-input__attachments">
         {attachments.length > 0 && <UploadFiles removeAttachment={removeAttachment} attachments={attachments}/>}
        </div>  
        </div>     
      </Fragment>
    );
};

ChatInput.propTypes = {
    className: PropTypes.string
};

export default ChatInput;