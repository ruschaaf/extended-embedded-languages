
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const LANG_SPEC_CSV = "embedded_language_specs.csv";

export function readEmbeddedSpecs() {
    const contents = fs.readFileSync(LANG_SPEC_CSV);
    let csvObjects = parse(contents, {
        columns: true
    });

    csvObjects.forEach(element => {
        // Fix up some of the list data types
        if (element.ids) {
            element.ids = element.ids.split(",")
        } else {
            element.ids = []
        }
        if (element.comments) {
            element.comments = element.comments.split(",")
        } else {
            element.comments = []
        }
    });

    return csvObjects;
}

