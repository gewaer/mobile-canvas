import moment from "moment"
import localization from 'moment/locale/es';

export function dateHourFormat(date){
    return moment(date).locale("es", localization).format("DD MMM YYYY [a las] hh:mm A")
}

export function dateFormat(date){
    return moment(date).locale("es", localization).format("DD MMM YYYY")
}
export function amountFormat(amount){
    let intAmount = amount.replace(',', '');
    intAmount = intAmount.replace('$', '');
    return intAmount*1;
}