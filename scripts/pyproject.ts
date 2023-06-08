import * as path from "https://deno.land/std@0.126.0/path/mod.ts";

import * as cli from "./cli/mod.ts";

// Settings
const fetchURL =
  "https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/pyproject.json";
const resourceDir = new URL("../resources/schemastore", import.meta.url);
const fileName = "pyproject.json";

// Misc
const scriptName = path.basename(new URL("", import.meta.url).pathname);

// Run
cli.run(fetchURL, resourceDir, fileName, scriptName);
