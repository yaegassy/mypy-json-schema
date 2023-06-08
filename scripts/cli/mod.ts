import * as path from "https://deno.land/std@0.126.0/path/mod.ts";

import { fetchContent, isDiff, saveContent } from "../common/mod.ts";

type CustomPyprojectJSONType = {
  properties: {
    tool: {
      properties: {
        mypy: {
          [key: string]: string;
        };
      };
    };
  };
};

export async function run(
  fetchURL: string,
  resourceDir: URL,
  fileName: string,
  scriptName: string,
) {
  const fileFullPath = path.join(resourceDir.pathname, fileName);

  if (Deno.args[0] === "download") {
    const content = await fetchContent(
      fetchURL,
    );
    if (!content) return;

    await saveContent(content, resourceDir, fileName);
    Deno.exit(0);
  } else if (Deno.args[0] === "check") {
    const content = await fetchContent(
      fetchURL,
    );
    if (!content) return;

    const res = await isDiff(content, fileFullPath);
    if (res) {
      console.log("OK");
      Deno.exit(0);
    } else {
      console.log("NG");
      Deno.exit(1);
    }
  } else if (Deno.args[0] === "generate") {
    if (scriptName !== "pyproject.ts") {
      console.log(
        `In "${scriptName}", the "generate" subcommand is not supported!`,
      );
      Deno.exit(1);
    }

    const text = await fetchContent(fetchURL);
    if (!text) return;

    let parsedJson: CustomPyprojectJSONType | undefined = undefined;

    try {
      parsedJson = JSON.parse(text);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      } else if (typeof e === "string") {
        console.log(e);
      } else {
        console.log("unexpected error");
      }
      Deno.exit(1);
    }

    const customPyprojectJSON = parsedJson as CustomPyprojectJSONType;
    if (!customPyprojectJSON.properties.tool.properties) return;

    customPyprojectJSON.properties.tool.properties.mypy = {
      "$ref":
        "https://raw.githubusercontent.com/yaegassy/mypy-json-schema/master/schemas/mypy.json",
    };

    const content = JSON.stringify(customPyprojectJSON, null, 2);
    const resourceDir = new URL("../../schemas", import.meta.url);
    await saveContent(content, resourceDir, "pyproject.json");
  } else {
    console.log(`There is no ${Deno.args[0]} subcommand!`);
    Deno.exit(1);
  }
}
