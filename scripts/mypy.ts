import { path } from "../deps.ts";

import * as cli from "./cli/mod.ts";

// Settings
const fetchURL = "https://mypy.readthedocs.io/en/stable/config_file.html";
const resourceDir = new URL("../resources/mypy", import.meta.url);
const fileName = "config_file.html";

// Misc
const scriptName = path.basename(new URL("", import.meta.url).pathname);

// Run
cli.run(fetchURL, resourceDir, fileName, scriptName);
