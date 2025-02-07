//@ts-check

import { AnomaliesAnalyzer } from "./anomalies-analyzer.js";
import { ingest } from "./file-injestion.js";
import { FlowsAnalyzer } from "./flows-analyzer.js";
import { generateReport, printReport } from "./report-generation.js";


function main(filePath) {
    const flowsAnalyzer = new FlowsAnalyzer();
    const anomaliesAnalyzer = new AnomaliesAnalyzer();

    ingest(
      {filePath,
      onEvent: (eventData) => {
        flowsAnalyzer.processEvent(eventData);
        anomaliesAnalyzer.processEvent(eventData);
      },
      onEnd: () => {
        flowsAnalyzer.analyzeFlows();
        anomaliesAnalyzer.analyzeAnomalies();
        const report = generateReport(flowsAnalyzer, anomaliesAnalyzer);
        printReport(report);
      }}
    );
  };


const filePath = process.argv[2];
main(filePath);