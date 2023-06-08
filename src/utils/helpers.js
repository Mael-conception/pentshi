export const getInitials = function (string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

export const isEmpty = function (obj) {
    return Object.keys(obj).length > 0 ? false : true;
}

export const containsObject = function (obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        console.log('================ lol lol ====================');
        console.log(list[i].property.id);
        console.log(obj.id);
        console.log('====================================');
        if (list[i].property === obj) {
            console.log('================ lol ====================');
            console.log(true);
            console.log('====================================');
            return true;
        }
    }
    console.log('================ lol ====================');
    console.log(false);
    console.log('====================================');
    return false;
}

export const formatLength = function (text, count, insertDots) {
    return text.slice(0, count) + (((text.length > count) && insertDots) ? "..." : "");
}