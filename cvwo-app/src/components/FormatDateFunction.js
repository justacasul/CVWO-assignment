
function formatDate(date) {
    if (date===null) {
        return null;
    }
    const recreatedDate = new Date(date);
    const day = recreatedDate.getDate();
    const month = recreatedDate.getMonth() + 1;
    const year = recreatedDate.getFullYear();
    let hour = recreatedDate.getHours();
    let minute = recreatedDate.getMinutes();
    if(hour === 0 && minute === 0) {
        return day + "/" + month + "/" + year
    } else {
        if(hour < 10) {
            hour = '0' + hour
        }
        if(minute < 10) {
            minute = '0' + minute
        }
        return day + "/" + month + "/" + year + " " + hour + ":" + minute;
    }
}

export {formatDate};
