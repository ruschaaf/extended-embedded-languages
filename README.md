# extended-embedded-languages

Adds syntax highlighting to C++, Javascript, Python and YAML for strings containing source code. Many different languages can be embedded.

![extension_example](images/extension_usage_anim.gif)

This Visual Studio Code extension enables syntax highlighting _within_
strings that contain source code. For example, a Python script might
have strings containing SQL or HTML or Bash. This plugin will add
syntax highlighting, and additionally code folding and
language-specific editor features within those strings. 

This is similar to how you can select syntax highlighting within
Markdown documents using a language specifier (e.g. ` ```py `) or
switch between HTML, Javascript, and CSS in the same HTML document.


## Features

This plugin extends the syntax highlighting of several **host**
languages in order to highlight **embedded** sub-languages within
strings. 

You need to specify which language you are using within the string.
How this is done depends on the host language (see below). Once that
is done you can see and edit the embedded language just like you are
editing a standalone file using that language. For example if you are
editing SQL within a C++ document, the VSCode "Toggle Line Comment"
command will prefix lines with `--` not `//`. Code folding will use
the natural structure of the embedded language block too - collapsing
`<tags>` in an XML string, or `{` braces in a C string


### Host Language - C++

C++ uses _raw strings_ to specify the language. 

A raw string in C++ looks like 
```cpp
auto s = R"foo( ...text )foo";
```

Between the `"` and `(` an arbitrary token can be placed which we use
here to specify the language. This token needs to exist at the end of
the string as well:

![cpp_example.png](images/cpp_example.png)

### Host language - Python

Python multiline strings do not have custom terminators the way C++,
Perl or other languages do. As such, we rely on _leading comments_ to
identify a language. This comment must be immediately after the `'''`
or `"""` which starts a multiline string

![py_example.png](images/py_example.png)


### Host language - YAML

YAML has block strings that begin with a `|` or `>` and continue based
on the indentation level of a block of text. Following the start
indicator you can put a comment (this is a *YAML* comment) which
indicates the language

![yaml_example.png](images/yaml_example.png)


### Embedded Languages

The available embedded languages are listed in this table. The "ID"
column is the IDs you can use in host languages like C++ and YAML
where you can specify an ID in the _host_ language. The "Comment"
column is for host languages like Python which have no way to indicate
the embedded language type directly, and shows what the first
characters of the _embedded_ language string needs to be to signal
which language you are using.

| Name                   | ID                           | Comment                                    |
|------------------------|------------------------------|--------------------------------------------|
| Batch                  | bat                          | `REM`, `@REM`, `::bat`                     |
| C                      | c                            | `/*c*/`                                    |
| C++                    | cpp, c++                     | `//cpp`, `//c++`                           |
| CSS                    | css                          | `/*css*/`                                  |
| GLSL                   | glsl                         | `//glsl`                                   |
| HLSL                   | hlsl                         | `//hlsl`                                   |
| HTML                   | html                         | `<!DOCTYPE`, `<html`, `<!--html`           |
| Ini                    | ini                          | `;ini`                                     |
| Javascript             | js, javascript               | `//js`                                     |
| JSON                   | json                         | [^1]                                       |
| JSONC                  | jsonc                        | `//jsonc`                                  |
| Metal shading language | metal                        | `//metal`                                  |
| Python                 | py, python                   | `#py`                                      |
| Shell                  | sh, bash, shell, shellscript | `#sh`, `#bash`, `#shell`, <br>`#!/bin/sh`, ... |
| SQL                    | sql                          | `--sql`                                    |
| TOML                   | toml                         | `#toml`                                    |
| WGSL                   | wgsl                         | `//wgsl`                                   |
| XML                    | xml                          | `<?xml`, `<? xml`, `<!--xml`               |
| YAML                   | yaml                         | `#yaml`                                    |


[^1]: JSON does not support comments, so there is no way to indicate a
  string is a JSON document within the string. 

## Developer Notes

See CONTRIBUTING.md for adding new languages



## Requirements



## Known Issues



## Release Notes

### 1.0.0

Initial release of Extended Embedded Languages

