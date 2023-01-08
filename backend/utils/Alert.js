export default class Alert {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.othersData = {};
  }
  setOtherData(otherData) {
    this.othersData = otherData;
  }
  makeAlert(message, statusCode, type = "danger") {
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
    if (statusCode === 500 && process.env.NODE_ENV !== "development") {
      message = "Impossible d'afficher les information pour le moment";
    }
    return this.makeAlert(message, statusCode);
  }
}
