export function toLocaleTimeString(date) {
    const d = new Date(date);
    return d.toLocaleTimeString();
}

export function isValidEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function getTime() {
    const now = new Date();
    return now.getTime();
}

export function getShortenText(message, length = 30) {
    if (message.length > length) {
        return `${message.substr(0, length)}...`;
    }

    return message;
}
