class NotExistEmailError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotExistEmailError';
    }
}

module.exports = NotExistEmailError