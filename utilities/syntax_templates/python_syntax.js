/**
 * Build the syntax definition for Python as a host language
 * @param {HostSpec} hostSpec - Specification for the host language
 * @param {EmbeddedSpec[]} embeddedSpecs - Array of data about each
 * embedded language
 * @returns {json} - Json object containing a TextMate language
 * injection
 */
export function buildPythonSyntax(hostSpec, embeddedSpecs) {
    // Build the patterns that match each embedded language, using an
    // internal comment. Skip languages that do not support comments.
    // Example: '''//cpp ...'''
    const patterns = embeddedSpecs.filter((embedded) => (embedded.comments.length > 0))
        .map((embedded) => ({
            'comment': `${embedded.name}-formatted triple-quoted strings`,
            'name': 'string.quoted.multi.embedded.python',
            'begin': String.raw`(?x)
( (?i:u|r|f|rf|fr|) )
('''|""")
(?= (?i:${embedded.comment_choice_re}) \b )`,
            'end': String.raw`(\2)`,
            'contentName': `meta.embedded.block.${embedded.vsname}.${hostSpec.vsname} ${embedded.root_scope}`,
            'patterns': [{ 'include': `${embedded.root_scope}` }],
            'beginCaptures': {
                '1': { 'name': 'storage.type.string.python' },
                '2': { 'name': 'punctuation.definition.string.begin.python' },
            },
            'endCaptures': {
                '1': { 'name': 'punctuation.definition.string.end.python' },
            },
        }));

    // Build the overall grammar injection file, and include the
    // patterns from above
    return {
        '$schema': 'https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json',
        'comment': `This file has been automatically generated by syntax_assembler.js
DO NOT HAND EDIT IT - changes will be lost.`,

        // We should be able to use a more specific injection selector
        // here. See this bug report for a description of how they work:
        // https://github.com/microsoft/vscode/issues/161177
        // Ideally we would inject new behavior into how the _content_
        // of the string.quoted.multi.python spans get parsed.
        // I haven't been able to get this to work in practice though,
        // it appears that the patterns then overrun the previously
        // found 'end' tag - similar to an issue described on this page:
        // https://www.apeth.com/nonblog/stories/textmatebundle.html
        'injectionSelector': 'L:source.python -string -comment',
        'scopeName': hostSpec.embedded_scope,
        'patterns': [{ 'include': '#triple_quoted_strings' }],
        'repository': {
            'triple_quoted_strings': {
                'comment': 'These patterns all match Python triple-quoted strings and select one language.' +
                    'The syntax is injected into https://github.com/microsoft/vscode/blob/main/extensions/python/syntaxes/MagicPython.tmLanguage.json',

                'patterns': patterns,
            },
        },
    };
}
