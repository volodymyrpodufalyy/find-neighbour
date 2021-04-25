// eslint-disable-next-line import/no-anonymous-default-export
export default ({ isAuth, values, errors }) => {
  const rules = {
    email: value => {
      if (!value) {
        errors.email = "Введіть E-Mail";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Невірний E-Mail";
      }
    },
    password: value => {
      if (!value) {
        errors.password = "Введіть пароль";
      } else if (
        !isAuth &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)
      ) {
        errors.password = "Надто легкий пароль";
      }
    },
    fullname: value => {
      if (!isAuth && !value) {
        errors.fullname = "Вкажіть своє ім'я та прізвище";
      }
    }
  };

  Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));
};
