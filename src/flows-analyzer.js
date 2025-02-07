
export class FlowsAnalyzer {
  constructor() {
    this.sessionEvents = new Map();
    this.mostMeaningfulFlows = [];
    this.totalNumberOfFlows = 0;
    this.visitsPerPage = new Map();
  }

  processEvent(event) {
    const { session_id, path, css } = event;
    if (!session_id || !path) return;

    if (!this.sessionEvents.has(session_id)) {
      this.sessionEvents.set(session_id, []);
    }
    this.sessionEvents.get(session_id).push({path, css});
  }

  analyzeFlows() {
    const checkoutFlow = {
      title: 'Purchase path',
      description: 'The path a customer takes to purchase a product',
      numberOfFlows: 0,
    };
    const changeLanguageFlow = {
      title: 'Change Language',
      description: 'The path a customer takes to change the language of the website',
      numberOfFlows: 0,
    };

    // eslint-disable-next-line no-unused-vars
    for (const [sessionId, events] of this.sessionEvents.entries()) {
      this.totalNumberOfFlows++;
      if (events.at(-1).path.includes('/checkout') || events.at(-1).path.includes('/cart')) {
        checkoutFlow.numberOfFlows++;
      }
      for (const event of events) {
        const { css, path } = event;
        if (path !== '/') {
          this.visitsPerPage.set(path, (this.visitsPerPage.get(path) || 0) + 1);
        }

        if (css.includes('select.language')) {
          changeLanguageFlow.numberOfFlows++;
        }
      }
    }
  
    this.mostMeaningfulFlows.push(checkoutFlow, changeLanguageFlow);
  }

  getMostMeaningfulFlows() {
    return this.mostMeaningfulFlows;
  }

  getTotalNumberOfFlows() {
    return this.totalNumberOfFlows;
  }

  getPageWithMostVisits() {
    const maxEntry = Array.from(this.visitsPerPage.entries()).reduce((a, b) => a[1] > b[1] ? a : b);
    return {path: maxEntry[0], visits: maxEntry[1]};
  }
}
