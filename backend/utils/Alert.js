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
}
