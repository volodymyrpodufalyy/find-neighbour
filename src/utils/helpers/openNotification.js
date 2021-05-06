import { notification } from 'antd';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ text, type = 'info', title, duration = 3 }) =>
  notification[type]({
    message: title,
    description: text,
    duration
  });