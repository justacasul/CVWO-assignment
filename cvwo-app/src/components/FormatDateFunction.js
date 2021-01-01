
function formatDate(date) {
    const recreatedDate = new Date(date);
    const day = recreatedDate.getDate();
    const month = recreatedDate.getMonth() + 1;
    const year = recreatedDate.getFullYear();
    const hour = recreatedDate.getHours();
    const minute = recreatedDate.getMinutes();
    return day + "/" + month + "/" + year + " " + hour + ":" + minute;
}

export {formatDate};
