// eslint-disable-next-line import/no-anonymous-default-export
export default (day, monthKey, year) => {
    const keyMonth = (parseInt(monthKey, 10) + 1);
    const keyDay = parseInt(day, 10);
    if (keyMonth && keyDay && year) {
      return  year + "-" + (keyMonth < 10 ? ("0" + keyMonth) : keyMonth) + "-" + (keyDay < 10 ? ("0" + keyDay) : keyDay) ;
    } else {
      return "" ;
    }
};