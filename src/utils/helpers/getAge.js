// eslint-disable-next-line import/no-anonymous-default-export
export default (selectedDate) => {
    const datePattern = /\d{4}-\d{2}-\d{2}/g;
    if (selectedDate.match(datePattern)) {
        let today = new Date();
        let birthDate = new Date(selectedDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    } else {
        return null;
    }
};