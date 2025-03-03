export let caches: any = {
    clientPagingThis: undefined,
    serverPagingThis: undefined
};

export const getFormattedDate = function (date: any) {
    if (date == "") return "";
    try {
        let year: number = date.getFullYear();
        let month: string = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day: string = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year.toString();
    }
    catch (err: any) {
        return "error";
    }
}

export const isNumeric = function(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

//Convert to UpperCamelCase.
export const camelize = function(str: string): string {
    return str.replace(/\b\w/g, chr => chr.toUpperCase()).replace(/ /g, "");
}
