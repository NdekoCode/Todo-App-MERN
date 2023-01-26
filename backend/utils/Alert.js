export default class Alert {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.othersData = {};
    this.field;
  }
  setOtherData(otherData, field = null) {
    this.othersData = otherData;
    if (field) {
      this.field = field;
    }
  }
  makeAlert(message, statusCode, type = "danger") {
    if (this.field && this.othersData) {
      return this.res.status(statusCode).json({
        alert: {
          statusCode,
          message,
          type,
        },
        [this.field]: {
          ...this.othersData,
        },
      });
    }
    return this.res.status(statusCode).json({
      alert: {
        statusCode,
        message,
        type,
      },
      ...this.othersData,
    });
  }
  danger(message, statusCode = 400) {
    if (statusCode === 500 && process.env.NODE_ENV === "production") {
      message = "Impossible d'afficher les information pour le moment";
    }
    return this.makeAlert(message, statusCode);
  }

  success(message, statusCode = 200, type = "success") {
    return this.makeAlert(message, statusCode, type);
  }

  warning(message, statusCode = 200, type = "warning") {
    return this.makeAlert(message, statusCode, type);
  }

  info(message, statusCode = 100, type = "info") {
    return this.makeAlert(message, statusCode, type);
  }
}
