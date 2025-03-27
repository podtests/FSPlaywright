
import { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {    
console.log("Running global setup");
}

export default globalSetup;