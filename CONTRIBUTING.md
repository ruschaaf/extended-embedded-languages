# Contributing

Thank you for your interest in contributing to this extension. In this doc you will find some notes on how to add support for additional languages

## Utilities

There are two utilities within the `utilities` folder you will need, both of these are 
node.js scripts.

`syntax_assembler.js` - Builds the TextMate syntax rules for host lanaguges, and updates the `package.json` file to load those rules.

`example_assembler.js` - Builds example files showing every embedded language inside every host language.

Both of these scripts can simply be executed directly with no command line arguments, or run through node:
```sh
node syntax_assembler.js
```

## Adding an Embedded Language

Embedded languages are relatively simple to add.

1. Update `utilities/embedded_language_specs.csv`. The fields here are:
    * `name` - Human readable name of the language
    * `vsname` - The name of the language that VSCode uses. These are the names that appear when you select a language mode for a document
    * `extension` - The standard file extension used for these files (used when generating example code)
    * `root_scope` - The root TextMate scope for this language. Find this by either using the "Inspect...Scopes" command described below or looking at the `package.json` file for the extension that adds that language parser (many of these are available at https://github.com/microsoft/vscode/tree/main/extensions)
    * `ids` - These are a comma seperated list of identifiers that can identify this language. These are used when you can use the _host_ language to specify the embedded language. For example in C++ we look for `"R<id>(` to delimit the embedded string
    * `comments` - These are a comma separated list of comment strings that can be used in the _embedded_ language to identify the language. These can be just prefixes, so for example we use `/*css` for CSS strings, but the actual text in the embedded langauge can be something like `/*css snippet*/`. Some care needs to be taken here and in the host language definition to ensure that prefixes don't conflict (e.g. the regexps in the host language need to make sure `/*c` for the C language doesn't match for a CSS string that starts with `/*css`)
    * `example_comment` - The comment string to use when generating examples
2. Add a new language snippet
    * Add a new file to `utilities/example_snippets` that contains a few lines of the new language. These should show a few different syntax types
3. Update the table in `README.md` with the new embedded language
4. Generate new examples and syntax definitions - in the `utilities` folder run `example_assembler.js` and `syntax_assembler.js`

## Adding a Host language

When adding a rule to the host language, here are some things to keep in mind:

* If the host language supports "here docs" or similar text blocks that have an arbitrary delimiter, use this delimiter to hold the language ID
```c++
// C++
str = R"css(
  .h1 { .color = #003366; }
)";
```

* If the host langugate supports multiline strings _and_ inline comments, put the language ID in a comment before the multiline string
```js
// Javascript
str = /*css*/`
  .h1 { .color = #003366; }
`
```

* If there is no way to specify the language in the host (without changing the semantics of the host code), we can fall back to specifying in the embedded language.

```py
# Python
s = """/*css*/
  .h1 { .color = #003366; }
"""
```



## Testing changes

Within Visual Studio Code you can test your extension by opening the extension folder and then pressing "F5" or running within the debugger. This opens an extension host window - an isolated VSCode environment where the extension is loaded.

Once there you can open the example scripts to make sure they are doing the right thing. To debug the 
regular expression parsing you can look at the markup that the TextMate parser is generating by 
using the `Developer: Inspect Editor Tokens and Scopes` 

