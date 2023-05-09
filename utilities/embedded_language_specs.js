
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const LANG_SPEC_CSV = 'embedded_language_specs.csv';

const SNIPPET_PATH = 'example_embedded_snippets';
const SNIPPET_NAME = 'snippet';

/**
 * @typedef {Object} EmbeddedSpec
 * @property {string} name - Human readable name of the language
 * @property {string} vsname - ID that visual studio uses for this
 * language
 * @property {string} extension - Standard file extension for this
 * language (used when searching for example snippets)}
 * @property {string} root_scope - The root TextMate scope for this
 * language
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
    const csvObjects = parse(contents, {
        columns: true,
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

        // See if we need to read sample snippets as well
        if (withExamples) {
            const snippetPath = path.join(
                    SNIPPET_PATH, `${SNIPPET_NAME}.${lang.extension}`);
            if (fs.existsSync(snippetPath)) {
                lang.raw_code = fs.readFileSync(snippetPath, 'utf-8');
            }
        }
    });

    return csvObjects;
}
