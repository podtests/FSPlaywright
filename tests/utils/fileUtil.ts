import * as fs from "fs";
export function readJSON(filepath: string){
   const data  = fs.readFileSync(filepath, "utf-8");
   return JSON.parse(data);
}

export function readJSonDataForTestCase(filepath: string, testcaseName: string) {
    const data = readJSON(filepath);
    return data[testcaseName];
}

