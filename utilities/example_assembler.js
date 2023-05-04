#!/usr/bin/env node
// This is a node.js script - to run it just run:
// node example_assembler.js

// This script will build examples of code files that have various
// other languages embedded in them

import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { readEmbeddedSpecs } from './embedded_language_specs.js';

// This is a list of all the languages we can embed. 
// name: The human readable name of the language
// id: The ID we use when a host language lets us specify an arbitrary
//     token as a delimiter (similar to how Markdown can specify a
//     language after ``` )
// comment: For languages that don't support an id, we can specify
//     something as a comment at the start of a string to indicate which
//     language, but this has to be valid syntax in the _embedded_ 
//     language so typically we choose a comment.
let embeddedLanguageSpecs = readEmbeddedSpecs();

// Load all of the snippet text. These are in separate files so that 
// it is easy to verify that this extension is working by comparing 
// the syntax highlighting in the files with the embedded highlighting.
embeddedLanguageSpecs.forEach(function (lang) {
    const snippetPath = path.join("example_embedded_snippets", "snippet." + lang.extension);
    if (fs.existsSync(snippetPath)) {
        lang.code = fs.readFileSync(snippetPath, 'utf-8');
    }
});


let hostLanguages = [
    { template: "cpp.ejs", output: "example.cpp" },
    { template: "python.ejs", output: "example.py" },
    { template: "yaml.ejs", output: "example.yaml" },
    { template: "javascript.ejs", output: "example.js", escapes: [['`', '\\`'], ['$', '\\$']] }
];

hostLanguages.forEach(function (hostLang) {
    const templatePath = path.join("example_host_templates", hostLang.template);
    if (hostLang.escapes) {
        // Apply any host-language-specific escaping to the snippets
        embeddedLanguageSpecs.forEach((embedLang) => {
            embedLang.unescaped_code = embedLang.code
            hostLang.escapes.forEach((escape) => {
                embedLang.code = embedLang.code.replaceAll(escape[0], escape[1]);
            })
        });
    }

    const template = ejs.compile(fs.readFileSync(templatePath, 'utf-8'));
    fs.writeFileSync(path.join("..", "examples", hostLang.output), template({ snippets: embeddedLanguageSpecs }));

    if (hostLang.escapes) {
        //Restore the original code
        embeddedLanguageSpecs.forEach((embedLang) => {
            embedLang.code = embedLang.unescaped_code
        });
    }
});


