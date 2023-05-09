#!/usr/bin/env node
// This is a node.js script - to run it just run
// node syntax_assembler.js

import fs from 'fs';
import path from 'path';
import { readEmbeddedSpecs } from './embedded_language_specs.js';
import { buildPythonSyntax } from './syntax_templates/python_syntax.js';
import { buildCppSyntax } from './syntax_templates/cpp_syntax.js';
import { buildYamlSyntax } from './syntax_templates/yaml_syntax.js';
import { buildJavascriptSyntax } from './syntax_templates/javascript_syntax.js';

/**
 * Escapes any characters in a string so that the string can be
 * included in a regular expression. For example '[1.2]' would become
 * '\[1\.2\]'
 * @param {string} str - Input string
 * @returns {string} a regular expression string which would match the
 * input string
 */
function regexpEscape(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generates all syntax files, given an array of host language
 * specifications and an array of embedded langauge specifications
 * Also updates package.json to point to these generated syntaxes
 * @param {HostSpec[]} hostSpecs
 * @param {EmbeddedSpec[]} embeddedSpecs
 */
function generateAllSyntaxes(hostSpecs, embeddedSpecs) {
    // Update the package.json to add all our host language syntaxes
    const packagePath = path.join('..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath));

    // Overwrite the grammars section with generated data
    packageJson.contributes.grammars = [];

    hostSpecs.forEach((spec) => {
    // Generate the syntax file
        const syntaxPath = path.join('..', 'syntaxes', spec.file);
        const syntax = spec.syntax_builder(spec, embeddedSpecs);
        fs.writeFileSync(syntaxPath, JSON.stringify(syntax, null, 2));

        console.log(`Generating ${syntaxPath}`);

        // Update the embeddings in the package.json file
        const embeddedings = {};
        embeddedSpecs.forEach((embedded) => {
            const key = `meta.embedded.string.raw.${embedded.vsname}.${spec.vsname}`;
            embeddedings[key] = embedded.vsname;
        });

        packageJson.contributes.grammars.push({
            scopeName: spec.embedded_scope,
            injectTo: [spec.root_scope],
            // Not using path.join for the path here because separator
            // characters should be '/' regardless of platform
            path: './syntaxes/' + spec.file,
            embeddedLanguages: embeddedings,
        });

        console.log(`Done generating ${syntaxPath}`);
    });

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}

/**
 * Main function - loads all host and embedded language definitions
 * and writes out syntax rules that can be parsed by the VSCode
 * TextMate engine, and updates the package.json to inject the
 * language rules when the extension is loaded.
 */
function main() {
    const hostLanguageSpecs = [
        {
            file: 'cpp.embedded.json',
            root_scope: 'source.cpp',
            syntax_builder: buildCppSyntax,
            vsname: 'cpp',
            embedded_scope: 'source.cpp.embedded.codeblock',
        },
        {
            file: 'python.embedded.json',
            root_scope: 'source.python',
            syntax_builder: buildPythonSyntax,
            vsname: 'python',
            embedded_scope: 'source.python.embedded.codeblock',
        },
        {
            file: 'yaml.embedded.json',
            root_scope: 'source.yaml',
            syntax_builder: buildYamlSyntax,
            vsname: 'yaml',
            embedded_scope: 'source.yaml.embedded.codeblock',
        },
        {
            file: 'javscript.embedded.json',
            root_scope: 'source.javascript',
            syntax_builder: buildJavascriptSyntax,
            vsname: 'javascript',
            embedded_scope: 'source.javascript.embedded.codeblock',
        },
    ];

    const embeddedLanguageSpecs = readEmbeddedSpecs();

    // Build some useful text fragments for the syntax templates
    embeddedLanguageSpecs.forEach((lang) => {
    // This is a Regex set of language alternatives - e.g.
    // `cpp|c\+\+|cxx`
        const escapedLangIds = lang.ids.map((s) => regexpEscape(s));
        lang.id_choice_re = escapedLangIds.join('|');

        // This is a regex set of comment prefixes - e.g.
        // `//cpp|//c\+\+`
        const escapedCommentPrefixes = lang.comments.map((s) => regexpEscape(s));
        lang.comment_choice_re = escapedCommentPrefixes.join('|');
    });

    generateAllSyntaxes(hostLanguageSpecs, embeddedLanguageSpecs);
}

main();
