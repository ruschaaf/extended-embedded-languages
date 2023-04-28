# extended-embedded-languages README

This Visual Studio Code extension enables better syntax
highlighting for snippets of code that are embedded
within another language. 

For example, a Python script might have strings containing SQL or HTML
or Bash. This plugin will add syntax
highlighting, and additionally code folding and language-specific editor
features _within_ those strings. 

This is similar to how you can select syntax highlighting within
Markdown documents using a language specifier (e.g. ` ```py `) or switch
between HTML, Javascript, and CSS in the same HTML document.

![extension_example](images/extension_usage_anim.gif)

## Features

This plugin extends the TextMate syntax highlighting definitions of
several **host** languages in order to look for **embedded**
sub-languages within strings. It does not contain any of its own syntax
highlighting rules, instead it typically replaces one single rule in the
host language which defines a multiline string, and looks for specific
indicators regarding which embedded language to use when highlighting
the string.

Within the embedded language block, your editor will behave as if it is
editing the embedded language. For example if you are editing SQL within
a C++ document, the VSCode "Toggle Line Comment" command will prefix
lines with `--` not `//`. Code folding will use the natural structure of
the embedded language block too - collapsing `<tags>` in an XML
string, or `{` braces in a C string


### Host Language - C++

C++ uses _raw strings_ to specify the language. 

A raw string in C++ looks like 
```cpp
auto s = R"foo( ...text )foo";
```

Between the `"` and `(` an arbitrary token can be placed which we
use here to specify the language. This token needs to exist at the end
of the string as well:

![cpp_example.png](images/cpp_example.png)

### Host language - Python

Python multiline strings do not have custom terminators the way C++,
Perl or other languages do. As such, we rely on _leading comments_ to
identify a language. This comment must be immediately after the `'''` or
`"""` which starts a multiline string

![py_example.png](images/py_example.png)


### Host language - YAML

YAML has block strings that begin with a `|` or `>` and continue based
on the indentation level of a block of text. Following the start
indicator you can put a comment (this is a *YAML* comment) which
indicates the language

![yaml_example.png](images/yaml_example.png)


### Embedded Languages

The available embedded languages are listed in this table. The "ID"
column is the IDs you can use in host languages like C++ and YAML where
you can specify an ID in the _host_ language. The "Comment" column is
for host languages like Python which have no way to indicate the
embedded language type directly, and shows
what the first characters of the _embedded_ language string needs to be to
signal which language you are using.

| Name       | ID                           | Comment                                    |
| ---------- | ---------------------------- | ------------------------------------------ |
| Batch      | bat                          | `REM`, `@REM`, `::bat`                     |
| C          | c                            | `/*c*/`                                    |
| C++        | cpp, c++                     | `//cpp`, `//c++`                           |
| CSS        | css                          | `/*css*/`                                  |
| HTML       | html                         | `<!DOCTYPE`, `<html`, `<!--html`           |
| Ini        | ini                          | `;ini`                                     |
| Javascript | js, javascript               | `//js`                                     |
| JSON       | json                         | (1)                                        |
| JSONC      | jsonc                        | `//jsonc`                                  |
| Python     | py, python                   | `#py`                                      |
| Shell      | sh, bash, shell, shellscript | `#sh`, `#bash`, `#shell`, `#!/bin/sh`, ... |
| SQL        | sql                          | `--sql`                                    |
| TOML       | toml                         | `#toml`                                    |
| XML        | xml                          | `<?xml`, `<? xml`, `<!--xml`               |
| YAML       | yaml                         | `#yaml`                                    |

* (1): JSON does not support comments, so there is no way to indicate a
  string is a JSON document within the string. 

## Developer Notes

See CONTRIBUTING.md for adding new languages

Useful links:
TextMate / Oniguruma regular expression language: 
https://macromates.com/manual/en/regular_expressions

TextMate language rules:
https://macromates.com/manual/en/language_grammars

Notes on grammar injection:
https://github.com/microsoft/vscode/issues/161177

Notes on writing a textmate grammar:
https://www.apeth.com/nonblog/stories/textmatebundle.html



## Requirements



## Known Issues



## Release Notes

### 1.0.0

Initial release of Extended Embedded Languages

