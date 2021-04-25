import { withFormik } from "formik";
import RegisterForm from "../components/RegisterForm";
import get from 'lodash/get';
import { userActions } from "redux/actions";
import validateForm from "utils/validate";
import { openNotification } from 'utils/helpers';
import store from "redux/store";

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    fullname: '',
    password: '',
    password_2: ''
  }),
  validate: values => {
    let errors = {};
    validateForm({ isAuth: false, values, errors });
    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(userActions.fetchUserRegister(values))
      .then(() => {
        props.history.push('/signup/verify');
        setSubmitting(false);
      })
      .catch(err => {
        if (get(err, 'response.data.message.errmsg', '').indexOf('dup') >= 0) {
          openNotification({
            title: 'Помилка',
            text: 'Акаунт с такою поштою вже існує.',
            type: 'error',
            duration: 5000
          });
        } else {
          openNotification({
            title: 'Помилка',
            text: 'Виникла помилка при реєстрації. Повторіть пізніше.',
            type: 'error',
            duration: 5000
          });
        }
        setSubmitting(false);
      });
  },
  displayName: 'RegisterForm'
})(RegisterForm);