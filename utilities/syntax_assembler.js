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
import { buildRustSyntax } from './syntax_templates/rust_syntax.js';

const PACKAGE_JSON_PATH = path.join('..', 'package.json');
// These dirs are relative to the PACKAGE_JSON_PATH
const SNIPPET_DIR = 'snippets';
const SYNTAX_DIR = 'syntaxes';

/**
 * Escapes any characters in a string so that the string can be
 * included in a regular expression. For example '[1.2]' would become
 * '\[1\.2\]'
 * @param {string} str - Input string
 * @returns {string} a regular expression string which would match the
 * input string
 */
function regexpEscape(str) {
    // Escape meaningful characters
    const s = str.replace(/[.*+?^${}()#|[\]\\]/g, '\\$&');
    // Convert spaces into '\s'
    return s.replace(/\s+/g, '/s');
}

/**
 * Generates all snippet files, given an array of host language
 * specifications and an array of embedded langauge specifications
 * Also updates package.json to point to these generated snippets
 * @param {*} hostSpecs
 * @param {*} embeddedSpecs
 */
function generateAllSnippets(hostSpecs, embeddedSpecs) {
    // Update the package.json to add all our embedded language snippets
    const packageDir = path.dirname(PACKAGE_JSON_PATH);
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH));

    packageJson.contributes.snippets = [];

    fs.mkdirSync(path.join(packageDir, SNIPPET_DIR), { recursive: true });

    hostSpecs.forEach((spec) => {
        // Generate the snippet file
        const snippetPath = path.join(packageDir, SNIPPET_DIR, `${spec.vsname}.code-snippets`);

        const embeddedSnippets = embeddedSpecs.map((embedded) => {
            const snippetStart = (spec.snippet_start
                .replace('<ID>', embedded.ids[0])
                .replace('<COMMENT>', embedded.example_comment));
            const snippetEnd = (spec.snippet_end
                .replace('<ID>', embedded.ids[0])
                .replace('<COMMENT>', embedded.example_comment));
            return [
                `${embedded.name} code block`,
                {
                    scope: spec.vsname,
                    prefix: embedded.ids[0],
                    body: [
                        snippetStart,
                        '\t$0',
                        snippetEnd,
                    ],
                },
            ];
        }
        );
        console.log(`Writing ${snippetPath}`);
        fs.writeFileSync(snippetPath, JSON.stringify(Object.fromEntries(embeddedSnippets), null, 2));

        packageJson.contributes.snippets.push({
            'language': spec.vsname,
            'path': `${SNIPPET_DIR}/${snippetPath}`,
        });
    });

    // Disabled for now - don't write the updated JSON until we are
    // sure we want to register all these snippets with VSCode
    // fs.writeFileSync(
    //     PACKAGE_JSON_PATH,
    //     JSON.stringify(packageJson, null, 2));
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
    const packageDir = path.dirname(PACKAGE_JSON_PATH);
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH));

    fs.mkdirSync(path.join(packageDir, SYNTAX_DIR), { recursive: true });

    // Overwrite the grammars section with generated data
    packageJson.contributes.grammars = [];

    hostSpecs.forEach((spec) => {
        // Generate the syntax file
        const syntaxPath = path.join(packageDir, SYNTAX_DIR, spec.file);
        const syntax = spec.syntax_builder(spec, embeddedSpecs);
        fs.writeFileSync(syntaxPath, JSON.stringify(syntax, null, 2));

        console.log(`Generating ${syntaxPath}`);

        // Update the embeddings in the package.json file. This tells
        // VSCode that when it sees a TextMate scope named
        // 'meta.embedded.block.foo.bar' that it should
        // behave as if it is editing language 'foo'. The
        // 'meta.embedded' part here is significant to VSCode, but the
        // rest of the scope name is arbitrary.
        const embeddingsArray = embeddedSpecs.map((embedded) => [
            `meta.embedded.block.${embedded.vsname}.${spec.vsname}`, // key
            embedded.vsname, // value
        ]);

        packageJson.contributes.grammars.push({
            'scopeName': spec.embedded_scope,
            'injectTo': [spec.root_scope],
            'path': `${SYNTAX_DIR}/${spec.file}`,
            'embeddedLanguages': Object.fromEntries(embeddingsArray),
        });

        console.log(`Done generating ${syntaxPath}`);
    });

    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2));
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
            // <ID> or <COMMENT> here will be replaced by the embedded
            // language's first ID or the example comment string
            // respectively
            snippet_start: 'R"<ID>(',
            snippet_end: ')<ID>"',
        },
        {
            file: 'python.embedded.json',
            root_scope: 'source.python',
            syntax_builder: buildPythonSyntax,
            vsname: 'python',
            embedded_scope: 'source.python.embedded.codeblock',
            snippet_start: '"""<COMMENT>',
            snippet_end: '"""',
        },
        {
            file: 'yaml.embedded.json',
            root_scope: 'source.yaml',
            syntax_builder: buildYamlSyntax,
            vsname: 'yaml',
            embedded_scope: 'source.yaml.embedded.codeblock',
            snippet_start: '| #<ID>',
            snippet_end: '',
        },
        {
            file: 'javscript.embedded.json',
            root_scope: 'source.js',
            syntax_builder: buildJavascriptSyntax,
            vsname: 'javascript',
            embedded_scope: 'source.js.embedded.codeblock',
            snippet_start: '/*<ID>*/ `',
            snippet_end: '`',
        },
        {
            file: 'rust.embedded.json',
            root_scope: 'source.rust',
            syntax_builder: buildRustSyntax,
            vsname: 'rust',
            embedded_scope: 'source.rust.embedded.codeblock',
            snippet_start: '/*<ID>*/ r#"',
            snippet_end: '"#',
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

    // EXPERIMENTAL - for now we generate the snippet files but don't
    // automatically register them with VSCode.
    generateAllSnippets(hostLanguageSpecs, embeddedLanguageSpecs);
}

main();
