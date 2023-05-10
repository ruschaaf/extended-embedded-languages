#!/usr/bin/env node
// This is a node.js script - to run it just run:
// node example_assembler.js

// This script will build examples of code files that have various
// other languages embedded in them

import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { readEmbeddedSpecs } from './embedded_language_specs.js';

const hostLanguages = [
    { template: 'cpp.ejs', output: 'example.cpp' },
    { template: 'python.ejs', output: 'example.py' },
    { template: 'yaml.ejs', output: 'example.yaml' },
    { template: 'javascript.ejs', output: 'example.js',
        escapes: [['`', '\\`'], ['$', '\\$']] },
];

/**
 * Apply escape sequences to sanitize any special characters in an
 * embedded language snippet. For example if a host language requires
 * that all '%' characters get escaped as '%%', this can be done here
 * in case any language snippets contain '%'
 * @param {object} hostLang - The host language spec, which may
 * contain escape definitions - currently in the form of a list of
 * (find, replace) tuples.
 * @param {string} code - The original source code that may be
 * modified
 * @returns {string} The original code, with any escapes applied as
 * specified by the host language
 */
function applyEscapes(hostLang, code) {
    if (!code) {
        return '';
    }
    if (!hostLang.escapes) {
        return code;
    }
    // Apply each replacement in turn to the code. Note that you'll
    // need to be careful about the order of replacements. I.e. if you
    // replace '$' with '\$' and '\' with '\\' you don't want to end
    // up with '\\$'.
    return hostLang.escapes.reduce(
            (str, [from, to]) => str.replaceAll(from, to),
            code
    );
}

/**
 * Main function, which will load all the language specifications
 * and generate examples for each of the host languages, containing
 * all of the embedded language information
 */
function main() {
    // This is a list of all the languages we can embed. Important fields in
    // each of the language spec objects are:
    // name: The human readable name of the language
    // id: The ID we use when a host language lets us specify an arbitrary
    //     token as a delimiter (similar to how Markdown can specify a
    //     language after ``` )
    // comment: For languages that don't support an id, we can specify
    //     something as a comment at the start of a string to indicate which
    //     language, but this has to be valid syntax in the _embedded_
    //     language so typically we choose a comment.
    // raw_code: The sample source code for this language
    const embeddedLanguageSpecs = readEmbeddedSpecs(true);

    // For each of the host languages, write out a file containing all
    // the examples.
    hostLanguages.forEach((hostLang) => {
    // Apply any escapes needed for the host language to the embedded snippet
        embeddedLanguageSpecs.forEach((embedLang) => {
            embedLang.code = applyEscapes(hostLang, embedLang.raw_code);
        });

        const templatePath = path.join('example_host_templates', hostLang.template);
        const template = ejs.compile(fs.readFileSync(templatePath, 'utf-8'));
        fs.writeFileSync(
                path.join('..', 'examples', hostLang.output),
                template({ snippets: embeddedLanguageSpecs }));
    });
}


main();
