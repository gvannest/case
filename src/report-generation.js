export function generateReport(flowsAnalyzer, anomaliesAnalyzer) {
  return {
    generated_at: new Date(),
    flows: {total_flows: flowsAnalyzer.getTotalNumberOfFlows(), page_with_most_visits_excl_home: flowsAnalyzer.getPageWithMostVisits(), meaningful_flows: flowsAnalyzer.getMostMeaningfulFlows()},
    anomalies: {total: anomaliesAnalyzer.getTotalNumberOfAnomalies(), payment_related_anomalies: anomaliesAnalyzer.getPaymentRelatedAnomalies(), help_requests: anomaliesAnalyzer.getHelpRequests()},
  };
}

export function printReport(report) {
  console.log(JSON.stringify(report, null, 2));
}
