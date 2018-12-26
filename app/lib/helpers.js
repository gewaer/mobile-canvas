import moment from "moment"

export function dateFormat(date){
    return moment(date).format("DD MMM[.] YYYY [a las] hh:mm A")
}