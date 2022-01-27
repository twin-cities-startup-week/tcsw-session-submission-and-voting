// let Honeybadger = require('honeybadger');

let { log } = console;

// Log non-critical messages (console log)
const logDebug = (message, ...params) => {
    if (process.env.NODE_ENV === 'development') {
        // Moved console log here so that it only shows during development and
        // to reduce linter warnings.
        log(message, ...params);
    } else if (process.env.NODE_ENV === 'test') {
        // Error logs in testing can clutter the output
        // log(message, ...params);
    }
};

// Log error messages
const logError = (error, options) => {
    if (process.env.NODE_ENV === 'production') {
        if (options) {
            // Honeybadger.notify(error, options);
        } else {
            // Honeybadger.notify(error);
        }
    } else if (process.env.NODE_ENV === 'development') {
        // Log errors in red text
        log('\x1b[31m%s\x1b[0m', error);
    } else if (process.env.NODE_ENV === 'test') {
        // This floods the console. Only turn this on when debugging a failing test.
        // log(error);
    }
};

// Used for unit testing
const setLogFn = (logFn) => {
    log = logFn;
};

// Used for unit testing
const setErrorLogFn = (logFn) => {
    // Honeybadger = logFn;
};

module.exports = {
    logDebug,
    setLogFn,
    logError,
    setErrorLogFn,
};
