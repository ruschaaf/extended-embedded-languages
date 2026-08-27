
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const LANG_SPEC_CSV = 'embedded_language_specs.csv';

const SAMPLE_PATH = 'embedded_samples';
const SAMPLE_NAME = 'sample';

// By default an embedded block is parsed by including the language's
// root scope, which treats the string as a whole source file. Some
// languages highlight better when the string is treated as a fragment
// instead. Java, for example, only applies method/field highlighting
// inside a class body, so a "floating" top-level method in an embedded
// string looks wrong when parsed as a file. Overriding it to include
// `source.java#class-body` (with the root scope kept as a fallback for
// file-level constructs like module/package/import) makes bare methods
// and fields highlight correctly. Keyed by `vsname`, value is the
// ordered list of scopes to include for the embedded block.
const EMBED_SCOPE_OVERRIDES = {
    java: ['source.java#class-body', 'source.java'],
};

/**
 * @typedef {Object} EmbeddedSpec
 * @property {string} name - Human readable name of the language
 * @property {string} vsname - ID that visual studio uses for this
 * language
 * @property {string} extension - Standard file extension for this
 * language (used when searching for example samples)}
 * @property {string} root_scope - The root TextMate scope for this
 * language (this determines _which_ grammar to use for the embedded
 * language)
 * @property {string[]} ids - Array of IDs that can be used to specify
 * this language, in a host language that is able to use language IDs
 * @property {string[]} comments - Array of comment prefixes that can
 * be used to specify this language, in a host language that can not
 * otherwise specify the embedded language
 * @property {string} example_comment - Comment to use when generating
 * examples
 * @property {string} notes - Arbitrary notes
 *
 * Other properties will be added at different points in processing
 */

/**
 * Read the specifications CSV that describes all the embedded languages
 * @param {boolean} withExamples - Load the example snippet for each language
 * @returns {EmbeddedSpec[]} Array of objects, one per embedded language
 */
export function readEmbeddedSpecs(withExamples) {
    const contents = fs.readFileSync(LANG_SPEC_CSV);
    let csvObjects = parse(contents, {
        columns: true,
        trim: true,
    });

    csvObjects.forEach((lang) => {
        // Fix up some of the list data types
        if (lang.ids) {
            lang.ids = lang.ids.split(',');
        } else {
            lang.ids = [];
        }
        if (lang.comments) {
            lang.comments = lang.comments.split(',');
        } else {
            lang.comments = [];
        }

        // Scopes to include when parsing an embedded block of this
        // language. Defaults to just the root scope (parse as a whole
        // file); see EMBED_SCOPE_OVERRIDES for exceptions.
        lang.embed_scopes = EMBED_SCOPE_OVERRIDES[lang.vsname] ||
            [lang.root_scope];

        // See if we need to read sample snippets as well
        if (withExamples) {
            const samplePath = path.join(
                SAMPLE_PATH, `${SAMPLE_NAME}.${lang.extension}`);
            if (fs.existsSync(samplePath)) {
                lang.raw_code = fs.readFileSync(samplePath, 'utf-8');
            }
        }
    });

    // Remove any "commented out" lines of the CSV - ones where the name
    // begins with '#'. We can't use the CSV parser's "comment" option
    // because it will find those comment characters anywhere within the
    // line, and they are often valid in other parts of the doc
    csvObjects = csvObjects.filter((obj) => obj.name[0] != '#');

    return csvObjects;
}
