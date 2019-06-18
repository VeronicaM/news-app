/* This Service can be used to send data to different error monitoring thrid parties like Sentry */

const MESSAGE_TYPES = {
    ERROR: 'error',
    WARNING: 'warning'
};

const log = ({ message, type, filename }) => {
    console.log(`Something went wrong - ${filename}: ${message}`);

    if (type === MESSAGE_TYPES.ERROR) {
        throw new Error(message);
    }
};

export default {
    log,
    MESSAGE_TYPES
};