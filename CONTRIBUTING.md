# Contributing

Thank you for your interest in contributing to this extension. In this
doc you will find some notes on how to add support for additional
languages


This plugin extends the TextMate syntax highlighting definitions of
several **host** languages in order to look for **embedded**
sub-languages within strings. It does not contain any of its own
syntax highlighting rules, instead it typically replaces one single
rule in the host language which defines a multiline string, and looks
for specific indicators regarding which embedded language to use when
highlighting the string.

Within the embedded language block, your editor will behave as if it
is editing the embedded language. For example if you are editing SQL
within a C++ document, the VSCode "Toggle Line Comment" command will
prefix lines with `--` not `//`. Code folding will use the natural
structure of the embedded language block too - collapsing `<tags>` in
an XML string, or `{` braces in a C string

## Architecture

Most of what VSCode thinks of as the extension is in fact generated.
This includes everything in the `snippets` and `syntaxes`
subdirectories, as well as the `examples` and most of `package.json`.
Two utility scripts described below are responsible for doing the
generation. So contributions to this extension will likely mean
contributing to the code generators and then running them to rebuild
the active extension. 

Often, you can test changes by editing the syntaxes or package.json
files directly, but this should be used purely for testing. Any
changes here may be overwritten by the automated generator.

## Utilities

There are two utilities within the `utilities` folder you will need,
both of these are node.js scripts.

`syntax_assembler.js` - Builds the TextMate syntax rules for host
lanaguges, and updates the `package.json` file to load those rules.

`example_assembler.js` - Builds example files showing every embedded
language inside every host language.

Both of these scripts can simply be executed directly with no command
line arguments, or run through node:
```sh
node syntax_assembler.js
```

### Makefile

Several utilities can be triggered through the root directory's
Makefile:

* `make install` - installs required node modules for development

* `make all` - Runs `syntax_assembler.js` and `example_assembler.js`

* `make package` - Creates a .vsix package for testing

* `make lint` - Runs ESLint on all javascript files

* `make fix` - Runs ESLint and fixes auto-fixable problems



## Adding an Embedded Language

Embedded languages are relatively simple to add.

1. Update `utilities/embedded_language_specs.csv`. The fields here
   are:
    * `name` - Human readable name of the language
    * `vsname` - The name of the language that VSCode uses. These are
      the names that appear when you select a language mode for a
      document
    * `extension` - The standard file extension used for these files
      (used when generating example code)
    * `root_scopes` - The root TextMate scope(s) for this language. Find
      this by either using the "Inspect...Scopes" command described
      below or looking at the `package.json` file for the extension
      that adds that language parser (many of these are available at
      https://github.com/microsoft/vscode/tree/main/extensions)
    * `ids` - These are a comma seperated list of identifiers that can
      identify this language. These are used when you can use the
      _host_ language to specify the embedded language. For example in
      C++ we look for `"R<id>(` to delimit the embedded string
    * `comments` - These are a comma separated list of comment strings
      that can be used in the _embedded_ language to identify the
      language. These can be just prefixes, so for example we use
      `/*css` for CSS strings, but the actual text in the embedded
      langauge can be something like `/*css for front page*/`. Some
      care needs to be taken here and in the host language definition
      to ensure that prefixes don't conflict (e.g. the regexps in the
      host language need to make sure `/*c` for the C language doesn't
      match for a CSS string that starts with `/*css`)
    * `example_comment` - The comment string to use when generating
      examples
2. Add a new language sample
    * Add a new file to `utilities/embedded_samples` that contains a
      few lines of the new language. These should show a few different
      syntax types
3. Update the table in `README.md` with the new embedded language
4. Generate new examples and syntax definitions - in the `utilities`
   folder run `example_assembler.js` and `syntax_assembler.js`

## Adding a Host language

* Note - this section needs to be filled out further

Adding a new host language is more complex. You need to write a new
_language injection_ that injects new bits of grammar into the host
language. This is a JSON file containing TextMate rules for how to
identify a code block in a particular language, and then how to syntax
highlight that code block.

1. Create a new syntax template. 
  * Find the language definition for the host language you are
    extending. These are usually `.tmLanguage.json` files that you can
    find inside whichever VSCode extension does the syntax
    highlighting. From there you can look at the structure of the
    syntax and find how multiline strings are highlighted. 
  * Determine how to identify the embedded language within the host
    language. See below for suggestions. 
  * Add a `utilities/syntax_templates` file containing a function
  that generates the language injection as a JSON object which will
  then get written to a file. It takes a list of embedded
  language specifications - each of these will be used to form the
  regular expression we will match, and to insert the embedded
  language's grammar into the host language.
2. Add the host language specification to
   `utilities/syntax_assembler.js`. This includes loading the function
   defined above, and filling out some metadata about the host language.
3. Create an example file
  * In `utilities/example_host_templates`, create a
   `<HOST_LANGUAGE>.ejs` This is an EJS template which will generate
   an example of the host language that contains **all** of the
   embedded languages. You can also use this file to demonstrate
   examples of what would and would not get highlighted, or unique
   features of the host language.
  * Update `example_assembler.js` to include the new host language.
4. Generate the code (`make all`) and test it out
  * Test it in the VSCode extension host (press F5 or `Debug: Start
    Debugging` from this workspace to open a new window with the
    extension loaded )
  * Use the Scope Inspector to debug your textmate grammar (`Developer:
    Inspect Editor Token and Scopes`)
5. Take new screenshots of the language, update documentation
  * README.md should describe how users will specify the embedded
    language within this host.

When adding a rule to the host language, here are some things to keep
in mind:

* If the host language supports "here docs" or similar text blocks
  that have an arbitrary delimiter, use this delimiter to hold the
  language ID. Try and let the user customize the delimiter as long as
  it starts with a language ID (followed by a non-alphabetic
  character, so that 'css' and 'c' don't both match the C language
  regexp)
```c++
// C++
str = R"css(
  .h1 { .color = #003366; }
)css";

str = R"c_header(
#include "stdio.h"
)c_header";
```

* If the host langugate supports multiline strings _and_ inline
  comments, put the language ID in a comment before the multiline
  string.
```js
// Javascript
str = /*css*/`
  .h1 { .color = #003366; }
`
```

* If there is no way to specify the language in the host (without
  changing the semantics of the host code), we can fall back to
  specifying using a comment in the embedded language. Each embedded
  language's definition includes a comment string that we can match.

```py
# Python
s = """/*css*/
  .h1 { .color = #003366; }
"""
```


## Testing changes

Within Visual Studio Code you can test your extension by opening the
extension folder and then pressing "F5" or running within the
debugger. This opens an extension host window - an isolated VSCode
environment where the extension is loaded.

Once there you can open the example scripts to make sure they are
doing the right thing. To debug the regular expression parsing you can
look at the markup that the TextMate parser is generating by using the
`Developer: Inspect Editor Tokens and Scopes` 

## Useful Links

Useful links:
TextMate / Oniguruma regular expression language: 
https://macromates.com/manual/en/regular_expressions

TextMate language rules:
https://macromates.com/manual/en/language_grammars

Notes on grammar injection:
https://github.com/microsoft/vscode/issues/161177

Notes on writing a textmate grammar:
https://www.apeth.com/nonblog/stories/textmatebundle.html
