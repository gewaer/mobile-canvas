import moment from "moment"
import localization from 'moment/locale/es';

export function dateFormat(date){
    return moment(date).locale("es", localization).format("DD MMM YYYY [a las] hh:mm A")
}