#!/usr/bin/env node
// This is a node.js script - to run it just run
// node syntax_assembler.js

import fs from 'fs';
import path from 'path';
import { readEmbeddedSpecs } from './embedded_language_specs.js';

const regexpEscape = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

function build_cpp_syntax(hostSpec, embeddedSpecs) {
    let syntax = {
        "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
        "injectionSelector": "L:source.cpp",
        "scopeName": `${hostSpec.embedded_scope}`,
        "patterns": [{ "include": "#raw_strings" }],
        "repository": {
            "raw_strings": {
                "comment": "These patterns all match C++ raw strings and select one language. The syntax is injected into " +
                    "https://github.com/microsoft/vscode/blob/main/extensions/cpp/syntaxes/cpp.tmLanguage.json",
                "patterns": []
            }
        }
    }

    embeddedSpecs.forEach(function (lang) {

        const escapedLangs = lang.ids.map((s) => regexpEscape(s));
        const langChoices = escapedLangs.join("|");

        syntax.repository.raw_strings.patterns.push(
            {
                "comment": `${lang.name}-formatted raw strings`,
                "begin": `((?:u|U|L|u8)?R)\\\"((?i:${langChoices})(?:[:^alpha:].*)?)\\(`,
                "end": "\\)(\\2)\\\"",
                "contentName": `meta.embedded.string.raw.${lang.vsname}.cpp`,
                "patterns": [{ "include": `${lang.root_scope}` }],
                "name": "string.quoted.double.raw.embedded.cpp",
                "beginCaptures": {
                    "0": { "name": "punctuation.definition.string.begin.cpp" },
                    "1": { "name": "meta.encoding.cpp" }, // Encoding (U, u8, etc..)
                    "2": { "name": "meta.encoding.cpp" }, // Language (json, py, sql, etc...)
                },
                "endCaptures": {
                    "0": { "name": "punctuation.definition.string.end.cpp" },
                    "1": { "name": "meta.encoding.cpp" }
                }
            }
        );
    });

    return syntax;
}

function build_python_syntax(hostSpec, embeddedSpecs) {
    let syntax = {
        "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",

        // We should be able to use a more specific injection selector
        // here. See this bug report for a description of how they work:
        // https://github.com/microsoft/vscode/issues/161177
        // Ideally we would inject new behavior into how the _content_
        // of the string.quoted.multi.python spans get parsed.
        // I haven't been able to get this to work in practice though,
        // it appears that the patterns then overrun the previously
        // found 'end' tag - similar to an issue described on this page:
        // https://www.apeth.com/nonblog/stories/textmatebundle.html
        "injectionSelector": "L:source.python",
        "scopeName": `${hostSpec.embedded_scope}`,
        "patterns": [{ "include": "#triple_quoted_strings" }],
        "repository": {
            "triple_quoted_strings": {
                "comment": "These patterns all match Python triple-quoted strings and select one language." +
                    "The syntax is injected into https://github.com/microsoft/vscode/blob/main/extensions/python/syntaxes/MagicPython.tmLanguage.json",
                "patterns": []
            }
        }
    }
    embeddedSpecs.forEach(function (lang) {
        if (lang.comments.length == 0) {
            return;
        }

        const escapedComments = lang.comments.map((s) => regexpEscape(s));
        const commentChoices = escapedComments.join("|");

        syntax.repository.triple_quoted_strings.patterns.push(
            {
                "comment": `${lang.name}-formatted triple-quoted strings`,
                "name": "string.quoted.multi.embedded.python",
                "begin": `(\\b[uU]|[rR][fF]?|[fF][rR]?)?('''|\"\"\")(?=(?i:${commentChoices})\\b)`,
                "end": "(\\2)",
                "contentName": `meta.embedded.string.raw.${lang.vsname}.python`,
                "patterns": [{ "include": `${lang.root_scope}` }],
                "beginCaptures": {
                    "1": { "name": "storage.type.string.python" },
                    "2": { "name": "punctuation.definition.string.begin.python" }
                },
                "endCaptures": {
                    "1": { "name": "punctuation.definition.string.end.python" }
                },
            }
        );
    });

    return syntax;
}

function build_yaml_syntax(hostSpec, embeddedSpecs) {
    let syntax = {
        "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
        "injectionSelector": "L:source.yaml",
        "scopeName": `${hostSpec.embedded_scope}`,
        "patterns": [{ "include": "#block-scalar-with-embedding" }],
        "repository": {
            "block-scalar-with-embedding": {
                "comment": "These patterns all match YAML block scalar strings and select one language." +
                    "The syntax is injected into https://github.com/microsoft/vscode/blob/main/extensions/yaml/syntaxes/yaml.tmLanguage.json",
                "patterns": []
            }
        }
    }
    embeddedSpecs.forEach(function (lang) {
        const escapedLangs = lang.ids.map((s) => regexpEscape(s));
        const langChoices = escapedLangs.join("|");

        syntax.repository["block-scalar-with-embedding"].patterns.push(
            {
                "comment": `${lang.name}-formatted block scalar strings`,
                "name": "string.quoted.multi.embedded.yaml",
                "begin": `(?:(\\|)|(>))([1-9])?([-+])?\\s*(#(?i:${langChoices}))\\b\\s*\\n?`,
                "beginCaptures": {
                    "1": { "name": "keyword.control.flow.block-scalar.literal.yaml" },
                    "2": { "name": "keyword.control.flow.block-scalar.folded.yaml" },
                    "3": { "name": "constant.numeric.indentation-indicator.yaml" },
                    "4": { "name": "storage.modifier.chomping-indicator.yaml" },
                    "5": { "name": `meta.encoding.yaml` },
                },
                "end": "^(?=\\S)|(?!\\G)",
                "patterns": [
                    {
                        "begin": "^([ ]+)(?! )",
                        "end": "^(?!\\1|\\s*$)",
                        "patterns": [{ "include": `${lang.root_scope}` }],
                        "name": `meta.embedded.string.raw.${lang.vsname}.yaml`
                    }
                ]
            }
        );
    });

    return syntax;
}



function generateAllSyntaxes(hostSpecs, embeddedSpecs) {
    // Update the package.json to add all our host language syntaxes
    const packagePath = path.join("..", "package.json")
    let packageJson = JSON.parse(fs.readFileSync(packagePath))

    // Overwrite the grammars section with generated data
    packageJson.contributes.grammars = []

    hostSpecs.forEach((spec) => {
        // Generate the syntax file
        const syntaxPath = path.join("..", "syntaxes", spec.file);
        const syntax = spec.syntax_builder(spec, embeddedSpecs);
        fs.writeFileSync(syntaxPath, JSON.stringify(syntax, null, 2));

        console.log(`Generating ${syntaxPath}`)

        // Update the embeddings in the package.json file
        let embeddedings = {}
        embeddedSpecs.forEach((embedded) => {
            const key = `meta.embedded.string.raw.${embedded.vsname}.${spec.vsname}`
            embeddedings[key] = embedded.vsname;
        });

        packageJson.contributes.grammars.push({
            scopeName: spec.embedded_scope,
            injectTo: [spec.root_scope],
            path: "./syntaxes/" + spec.file, // Not using path.join here because separator characters should be '/' regardless of platform
            embeddedLanguages: embeddedings
        });

        console.log(`Done generating ${syntaxPath}`)
    });

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
}

function main() {
    const hostLanguageSpecs = [
        {
            file: "cpp.embedded.json",
            root_scope: "source.cpp",
            syntax_builder: build_cpp_syntax,
            vsname: "cpp",
            embedded_scope: "source.cpp.embedded.codeblock"
        },
        {
            file: "python.embedded.json",
            root_scope: "source.python",
            syntax_builder: build_python_syntax,
            vsname: "python",
            embedded_scope: "source.python.embedded.codeblock"
        },
        {
            file: "yaml.embedded.json",
            root_scope: "source.yaml",
            syntax_builder: build_yaml_syntax,
            vsname: "yaml",
            embedded_scope: "source.yaml.embedded.codeblock"
        }
    ]

    const embeddedLanguageSpecs = readEmbeddedSpecs();

    generateAllSyntaxes(hostLanguageSpecs, embeddedLanguageSpecs);
}

main();
