export function ValidateEmail(mail: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}
export function ValidatePhone(phone: string): boolean {
    return /((0)+([0-9]{9})\b)/g.test(phone);
}

export const strToSlug = (str: string, locale = "vi") => {
    str = str.toLowerCase();
    let slug = str;
    if (locale == "vi") slug = removeSignVietnamese(str);
    slug = slug.replace(/[^\w-]+/g, "-");
    slug = slug.replace(/\-$/g, "");
    slug = slug.replace(/^\-/g, "");
    slug = slug.replace(/\ +/g, "-");
    slug = slug.toLowerCase();
    return slug;
};

export const removeSignVietnamese = (str = "") => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
};

export function getFileNameFromPath(path: string): string {
    if (path == null) {
       return path;
    }
    const ext = path.substring(path.lastIndexOf('.'));
    const baseName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    if (ext == path) {
       path = trim(path);
       return path.substr(path.lastIndexOf('/') + 1);
    }
    return `${baseName}${ext}`;
 }
 
 export function trimRight(str: string, char = '/'): string {
    return str[str.length - 1] == char ? str.substr(0, str.length - 1) : str;
 }
 
 export function trimLeft(str: string, char = '/'): string {
    return str[0] == char ? str.substr(1) : str;
 }
 
 export function trim(str: string, char = '/'): string {
    str = trimLeft(str, char);
    str = trimRight(str, char);
    return str;
 }

export const isFile = (object: any) => {
    if (
        object &&
        typeof object.type != "undefined" &&
        typeof object.size != "undefined"
    ) {
        return true;
    } else {
        return false;
    }
};
export const isFileObject = (object: any) => {
    if (!object) return false;
    let keys = Object.keys(object);
    return (
        keys.includes("value") &&
        keys.includes("preview") &&
        (isFile(object["value"]) || !object["value"])
    );
};

export const convertFormData = (data: any) => {
    let form = new FormData();
    for (var key in data) {
        if (Array.isArray(data[key])) {
            for (let value of data[key]) {
                form.append(key, value);
            }
        } else form.append(key, data[key]);
    }
    return form;
};

export const convertToFormData = (data: Object, fileFields: Array<string>) => {
    let keys = Object.keys(data);
    let values = Object.values(data);
    let formData = new FormData();
    keys.forEach((key, index) => {
        switch (true) {
            case fileFields.includes(key) &&
                !(values[index]?.value == "" && values[index]?.preview):
                formData.append(key, values[index]?.value || "");
                break;
            case ["string", "boolean", "number"].includes(
                typeof values[index]
            ) && values[index] !== "":
                formData.append(key, values[index]);
                break;
            default:
                break;
        }
    });
    return formData;
};

export const getNameFile = (name: string) => {
    return name.replace(/^.*[\\\/]/, "");
};

export const convertToFormDataV2 = (
    data: Object,
    fileFields: Array<any> = []
) => {
    let formData = new FormData();
    convertObjectDataToForm(formData, "", data, fileFields);
    return formData;
};

const convertSimpleDataToForm = (
    formData: FormData,
    field: any,
    value: any
) => {
    formData.append(field, value);
};

const convertObjectDataToForm = (
    formData: FormData,
    field: any,
    object: Object,
    fileFields: Array<any> = []
) => {
    if (!object) return;
    let keys = Object.keys(object);
    let values = Object.values(object);
    keys.forEach((key, index) => {
        let appendField = key;
        if (field) appendField = `${field}[${key}]`;

        //simple
        if (["string", "boolean", "number"].includes(typeof values[index])) {
            convertSimpleDataToForm(formData, appendField, values[index]);

            //array
        } else if (Array.isArray(values[index])) {
            convertArrayDataToForm(
                formData,
                appendField,
                values[index],
                fileFields
            );
        } else if (["object"].includes(typeof values[index])) {
            //non locale file
            if (isFileObject(values[index])) {
                let value = values[index].value
                    ? values[index].value
                    : getFileNameFromPath(values[index].preview || "");
                convertSimpleDataToForm(formData, appendField, value);
            } else {
                convertObjectDataToForm(
                    formData,
                    appendField,
                    values[index],
                    fileFields
                );
            }
        }
    });
};

const convertArrayDataToForm = (
    formData: FormData,
    field: any,
    array: Array<any>,
    fileFields: Array<any> = []
) => {
    array.map((value: any, index) => {
        //simple
        if (["string", "boolean", "number"].includes(typeof value))
            convertSimpleDataToForm(formData, `${field}[${index}]`, value);
        if (isFileObject(value)) {
            let file = value.value
                ? value.value
                : getFileNameFromPath(value.preview || "");
            convertSimpleDataToForm(formData, `${field}[${index}]`, file);
        } else if (["object"].includes(typeof value))
            convertObjectDataToForm(
                formData,
                `${field}[${index}]`,
                value,
                fileFields
            );
    });
};

export const currencyFormat = (number: number) => {
    if (typeof number == "number")
        return number.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
        });
    return "";
};

export const objectIsNull = (object: any) => {
    if (!object) return false;
    for (let key in object) {
        if (
            object[key] != null ||
            object[key] != undefined ||
            object[key] != ""
        ) {
            return true;
        }
    }
    return false;
};
