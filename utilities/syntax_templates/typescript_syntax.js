/**
 * Build the syntax definition for TypeScript as a host language
 * @param {HostSpec} hostSpec - Specification for the host language
 * @param {EmbeddedSpec[]} embeddedSpecs - Array of data about each
 * embedded language
 * @returns {json} - Json object containing a TextMate language
 * injection
 */
export function buildTypescriptSyntax(hostSpec, embeddedSpecs) {
    // Build the patterns that match each embedded language, using
    // a preceeding inline comment
    // Example: /*cpp*/ `...`
    const embeddedCommentPatterns = embeddedSpecs.map((lang) => {
        return {
            'comment': `${lang.name} formatted template strings`,
            'begin': String.raw`(?x)
(/\*(?i:${lang.id_choice_re})\*/)
\s*
([_\$[:alpha:]][_\$[:alnum:]]*)?
(\`)`,
            'contentName': `meta.embedded.block.${lang.vsname}.${hostSpec.vsname} ${lang.root_scope}`,
            'end': '`',
            'beginCaptures': {
                '1': { 'patterns': [{ 'include': `${hostSpec.root_scope}#comment` }] },
                '2': { 'name': 'entity.name.function.tagged-template.ts' },
                '3': { 'name': 'string.template.ts punctuation.definition.string.template.begin.ts' },
            },
            'endCaptures': {
                '0': { 'name': 'string.template.ts punctuation.definition.string.template.end.ts' },
            },
            'patterns': [
                { 'include': '#template-substitution-element' },
                { 'include': '#string-character-escape' },
                { 'include': `${lang.root_scope}` },
            ],
        };
    });

    // Build the patterns that match each embedded language, using
    // a tagged template. Implementation of the tag function is left
    // to the users. (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
    // Example: cpp`...`
    const embeddedTagPatterns = embeddedSpecs.map((lang) => {
        return {
            'comment': `${lang.name} formatted template strings`,
            'begin': String.raw`(?x)
(?i:${lang.id_choice_re})
(\`)`,
            'contentName': `meta.embedded.block.${lang.vsname}.${hostSpec.vsname} ${lang.root_scope}`,
            'beginCaptures': {
                '1': { 'name': 'entity.name.function.tagged-template.ts' },
                '2': { 'name': 'string.template.ts punctuation.definition.string.template.begin.ts' },
            },
            'end': '`',
            'endCaptures': {
                '0': { 'name': 'string.template.ts punctuation.definition.string.template.end.ts' },
            },
            'patterns': [
                { 'include': '#template-substitution-element' },
                { 'include': '#string-character-escape' },
                { 'include': `${lang.root_scope}` },
            ],
        };
    });

    // Build the overall grammar injection file, and include the
    // patterns from above
    return {
        '$schema': 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
        'comment': `This file has been automatically generated by syntax_assembler.js
DO NOT HAND EDIT IT - changes will be lost.`,
        'injectionSelector': 'L:source.ts -string -comment',
        'scopeName': `${hostSpec.embedded_scope}`,
        'patterns': [
            { 'include': '#template-string-with-tag' },
            { 'include': '#template-string-with-preceeding-comment' },
        ],
        'repository': {
            'template-string-with-preceeding-comment': {
                'comment': 'These patterns all match Typescript template strings and select one language.' +
                    'The syntax is injected into https://github.com/microsoft/vscode/blob/main/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json',
                'patterns': embeddedCommentPatterns,
            },
            'template-string-with-tag': {
                'comment': 'These patterns all match Typescript template strings and select one language.' +
                    'The syntax is injected into https://github.com/microsoft/vscode/blob/main/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json',
                'patterns': embeddedTagPatterns,
            },
        },
    };
}