//@ts-check

import fs from "node:fs";
import split2 from "split2";

export function ingest({ filePath, onEvent, onEnd }) {
  fs.createReadStream(filePath)
    .pipe(split2())
    .on("data", (line) => {
      if (!line.trim()) return;
      try {
        const eventData = JSON.parse(line);
        onEvent(eventData);
      } catch (err) {
        console.error("Error parsing JSON line:", err);
      }
    })
    .on("end", onEnd)
    .on("error", (err) => {
      console.error("Error in reading file:", err);
    });
}
