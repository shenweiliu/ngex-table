import { UseAbsoluteTemplateUrl } from './model-interface';

export let absoluteTemplateUrl: UseAbsoluteTemplateUrl = {
    PaginationComponent: false,
    ColumnSortingComponent: false,
    MultiSortingCommandComponent: false,
    OptionsComponent: false,
    SortingTypeComponent: false
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

export const deepClone = function (source: any): any {
    // return value is input is not an Object or Array.
    if (typeof (source) !== 'object' || source === null) {
        return source;
    }
    let clone!: any;
    if (Array.isArray(source)) {
        clone = source.slice();  // unlink Array reference.
    } else {
        clone = Object.assign({}, source); // Unlink Object reference.
    }
    let keys: any = Object.keys(clone);
    for (let i: number = 0; i < keys.length; i++) {
        clone[keys[i]] = deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
    }
    return clone; // return unlinked clone.
}
