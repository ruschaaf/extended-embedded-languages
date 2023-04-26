#!/usr/bin/env node
// This is a node.js script - to run it just run:
// node example_assembler.js

// This script will build examples of code files that have various
// other languages embedded in them

import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { readSpecs } from './embedded_language_specs.js';

// This is a list of all the languages we can embed. 
// name: The human readable name of the language
// id: The ID we use when a host language lets us specify an arbitrary
//     token as a delimiter (similar to how Markdown can specify a
//     language after ``` )
// comment: For languages that don't support an id, we can specify
//     something as a comment at the start of a string to indicate which
//     language, but this has to be valid syntax in the _embedded_ 
//     language so typically we choose a comment.
let embeddedLanguageSpecs = readSpecs();

// Load all of the snippet text. These are in separate files so that 
// it is easy to verify that this extension is working by comparing 
// the syntax highlighting in the files with the embedded highlighting.
embeddedLanguageSpecs.forEach(function (lang) {
    const snippetPath = path.join("example_snippets", "snippet." + lang.extension);
    if (fs.existsSync(snippetPath)) {
        lang.code = fs.readFileSync(snippetPath, 'utf-8');
    }
});


let hostLanguages = [
    { template: "cpp.ejs", output: "example.cpp" },
    { template: "python.ejs", output: "example.py" },
    { template: "yaml.ejs", output: "example.yaml" }
];

hostLanguages.forEach(function (lang) {
    const templatePath = path.join("example_templates", lang.template);
    const template = ejs.compile(fs.readFileSync(templatePath, 'utf-8'));
    fs.writeFileSync(path.join("..", "examples", lang.output), template({ snippets: embeddedLanguageSpecs }));
});


