import moment from "moment";

export function getDateFromTimestamp(time:number){
    const date = moment.unix(time).format("DD/MM/YYYY")

    return date
}