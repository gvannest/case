export class AnomaliesAnalyzer {

  constructor() {
    this.anomalies = [];
    this.totalNumberOfAnomalies = 0;
    this.paymentAnomalies = [];
    this.helpRequests = [];
  }

  processEvent(event) {
    const { css, text, path, session_id } = event;
    
    const cssKeywords = ['error', 'help'];
    if (cssKeywords.some((kw) => css.toLowerCase().includes(kw))) {
      this.anomalies.push({
        session_id,
        css,
        text,
        path,
      });
      this.totalNumberOfAnomalies++;
    }
  }

  analyzeAnomalies() {
    this.paymentAnomalies = this.anomalies.filter((anomaly) => anomaly.text.toLowerCase().includes('payment')).map((anomaly) => ({path: anomaly.path, text: anomaly.text}));
    this.helpRequests = this.anomalies.filter((anomaly) => anomaly.css.toLowerCase().includes('help')).map((anomaly) => ({path: anomaly.path, text: anomaly.text}));
  }

  getTotalNumberOfAnomalies() {
    return this.totalNumberOfAnomalies;
  }

  getPaymentRelatedAnomalies() {
    return {total: this.paymentAnomalies.length, anomalies: this.paymentAnomalies};
  }

  getHelpRequests() {
    return {total: this.helpRequests.length, anomalies: this.helpRequests};
  }
}