# mypy-json-schema

## Overview

This is the JSON schema for "mypy" (`[tool.mypy]`) specifically designed for the `pyproject.toml` file.

We have configured it to reference the JSON schema for mypy in this repository based on the `pyproject.json` in the [Schema Store](https://www.schemastore.org).

## DEMO

https://github.com/yaegassy/mypy-json-schema/assets/188642/27f882e4-4ba6-4e3d-bf98-40d9c7a1cc5d

## Usage

### Editor Integration

Please install the TOML language server called [taplo](https://github.com/tamasfe/taplo).

You can also download the binary built from the [GitHub Releases](https://github.com/tamasfe/taplo/releases) page, Please download the file with `"full"` in its name, such as `taplo-full-darwin-aarch64.gz`.

Please create a configuration for `evenBetterToml.schema.associations` and set it to reference the schema for `pyproject.toml` from this repository's `pyproject.json`.

Here is an example of a configuration for the language client I am using. Please adapt it to your environment.

```json
{
  "languageserver": {
    "taplo": {
      "command": "taplo",
      "args": ["lsp", "stdio"],
      "filetypes": ["toml"],
      "settings": {
        "evenBetterToml": {
          "schema": {
            "associations": {
              "^(.*(/|\\\\)\\.?pyproject\\.toml|\\.?pyproject\\.toml)$": "https://raw.githubusercontent.com/yaegassy/mypy-json-schema/master/schemas/pyproject.json"
            }
          },
        }
      }
    }
  }
}
```

## License

MIT
