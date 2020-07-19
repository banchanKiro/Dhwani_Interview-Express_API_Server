class ValidationError extends Error {
  constructor(details) {
    super('Validation Error');
    this.details = details.map((item) => {
      let key = '';
      item.path.map((k, i) => {
        if (i !== 0) {
          key += '->';
        }
        key += k;
        return key;
      });
      return { [key]: item.message };
    });
  }

  toString() {
    return {
      message: this.message,
      details: this.details,
    };
  }
}

module.exports = ValidationError;
