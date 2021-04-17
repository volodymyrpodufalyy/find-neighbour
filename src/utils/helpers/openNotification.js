import { notification } from 'antd'

export default ( {text, type = 'info', title }) =>
 notification[type] ({
    message:  title,
    description: text
})