export function getRedirectTo(type, header) {
    let path
    //type
    if (type === 'boss') {
        path = '/boss'
    } else {
        path = '/expert'
    }
    //header
    if (!header) {//no value, return info complete
        path += 'info'
    }
    return path
}