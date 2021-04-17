import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import './ChatInput.scss';
import { Input,Button } from 'antd';
import { UploadField } from '@navjobs/upload';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
// import { useOutSideClick } from 'utils/helpers';

const { TextArea } = Input;

const ChatInput = props => {
    const [value, setValue] = useState("");
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const { onSendMessage, currentDialogId } = props;
  
    const toggleEmojiPicker = () => {
      setShowEmojiPicker(!emojiPickerVisible);
    };
  
    const handleSendMessage = e => {
      if (e.keyCode === 13) {
        onSendMessage(value, currentDialogId);
        setValue("");
      }
    };
  
    const addEmoji = ({ colons }) => {
      setValue((value + '' + colons).trim())
    }

    const handleOutSideClick = (el, e) => {
      if (el && !el.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };

    useEffect(() => {
      const el = document.querySelector('.chat-input__smile-btn');

      document.addEventListener("click", handleOutSideClick.bind(this, el));
        return () => {
        document.removeEventListener("click", handleOutSideClick(this, el));            
      }

    }, []);

    return (    
        <div className="chat-input">
        <div className="chat-input__smile-btn">
        <div className="chat-input__emoji-picker">
        {emojiPickerVisible &&  (
                <Picker onSelect={(emojiTag) => addEmoji(emojiTag)} set='apple' />
            )}
            </div>
        <Button onClick={toggleEmojiPicker} icon={<SmileOutlined />}/>
        </div>
        <TextArea
         onChange={e => setValue(e.target.value)}
         onKeyUp={handleSendMessage}
         size="large"
         placeholder="Введіть текст повідомлення…"
         value={value}
         autoSize={{ minRows: 1, maxRows: 6 }}
          />
        <div className="chat-input__actions"> 
            <UploadField onFiles={files => console.log(files)}
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
            {value ? <Button icon={<SendOutlined />}/> :<Button icon={<AudioOutlined />}/>}
        </div>
        </div>        
    );
};

ChatInput.propTypes = {
    className: PropTypes.string
};

export default ChatInput;