import {withFormik} from "formik";
import AddInfoForm from "../components/AddInfoForm";
import {addinfoActions} from "../../../redux/actions";
import validateForm from "../../../utils/validate";
import {openNotification} from '../../../utils/helpers';
import store from "../../../redux/store";

export default withFormik({
    mapPropsToValues: () => ({
        age: 0,
        address: '',
        sex: "00",
        pets: "00",
        badHabits: "00",
        kindOfActivity: "00",
        haveJobOrJobless: "00",
        maritalStatus: "00",
        phoneNumber: '',
        moreAboutUser: ''
    }),
    validate: values => {
        let errors = {};
        validateForm({isAuth: true, values, errors});
        console.log(values)
        return errors;
    },
    handleSubmit: (values, {setSubmitting, props}) => {
        store
            .dispatch(addinfoActions.fetchUserAddInfoCreate(values))
            .then(({status}) => {
                if (status === "success") {
                    props.history.push("/signup/verify");
                }
                setSubmitting(false);
            })
            .catch(err => {
                openNotification({
                    title: 'Помилка',
                    text: 'Виникла помилка при реєстрації. Повторіть пізніше.',
                    type: 'error',
                    duration: 5000
                });
                setSubmitting(false);
            });
    },
    displayName: 'AddInfoForm'
})(AddInfoForm);
