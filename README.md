# extended-embedded-languages README

This is a Visual Studio Code extension which enables better syntax
highlighting for programming languagess embedded as strings within other
programming language files. 

For example, if you are writing a Python script, and have snippets of
SQL embedded as strings within that file, you may want to syntax
highlight the SQL as if it were its own document.

This is similar to how you can select syntax highlighting within
Markdown documents using a language specifier (e.g. ` ```py `)


## Features

This supplements existing syntax highlighters by injecting new behavior
when specific types of string delimiters or "HERE DOC" sigils are found.
It does not contain its own language definitions. 

Within the embedded language block, your editor will behave as if it is
editing the embedded language. For example if you are editing SQL within
a C++ document, the VSCode "Toggle Line Comment" command will prefix
lines with `--` not `//`. 

## Requirements


## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.0

Initial release of Extended Embedded Languages

