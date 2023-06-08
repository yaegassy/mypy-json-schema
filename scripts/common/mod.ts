import { path } from "../../deps.ts";

export async function saveContent(
  text: string,
  resourceDir: URL,
  filename: string,
) {
  try {
    await Deno.stat(resourceDir);
  } catch (_e) {
    Deno.mkdirSync(resourceDir);
  }

  const filePath = path.join(resourceDir.pathname, filename);

  await Deno.writeTextFile(filePath, text).catch((e) => {
    if (e instanceof Error) {
      console.log(e.message);
    } else if (typeof e === "string") {
      console.log(e);
    } else {
      console.log("unexpected error");
    }

    Deno.exit(1);
  });
}

export async function fetchContent(url: string) {
  const response = await fetch(
    url,
  );
  if (!response.ok) return;

  return await response.text();
}

export async function isDiff(srcText: string, filePath: string) {
  try {
    await Deno.stat(filePath);
  } catch (_e) {
    // ...noop
  }
  const destText = await Deno.readTextFile(filePath);
  return srcText === destText;
}
