// This script will build examples of code files that have various
// other languages embedded in them

const fs = require('fs');
const ejs = require('ejs');

// This is a list of all the languages we can embed. 
// name: The human readable name of the language
// id: The ID we use when a host language lets us specify an arbitrary
//     token as a delimiter (similar to how Markdown can specify a
//     language after ``` )
// comment: For languages that don't support an id, we can specify
//     something as a comment at the start of a string to indicate which
//     language, but this has to be valid syntax in the _embedded_ 
//     language so typically we choose a comment.
let embeddedLanguageSnippets = [
    { name: "C++", id: "cpp", comment: "//cpp" },
    { name: "CSS", id: "css", comment: "/*css*/" },
    { name: "HTML", id: "html", comment: "<html>" },
    { name: "INI", id: "ini", comment: ";ini" },
    { name: "Javascript", id: "js", comment: "//js" },
    { name: "JSON", id: "json" },
    { name: "Python", id: "py", comment: "#py" },
    { name: "Shell", id: "sh", comment: "#sh" },
    { name: "SQL", id: "sql", comment: "--sql" },
    { name: "TOML", id: "toml", comment: "#toml" },
    { name: "XML", id: "xml", comment: "<?xml?>" },
    { name: "YAML", id: "yaml", comment: "#yaml" },
]

// Load all of the snippet text. These are in separate files so that 
// it is easy to verify that this extension is working by comparing 
// the syntax highlighting in the files with the embedded highlighting.
embeddedLanguageSnippets.forEach(function (lang) {
    lang.body = fs.readFileSync("snippets/snippet." + lang.id, 'utf-8');
});


let hostLanguages = [
    { template: "cpp.ejs", output: "example.cpp" },
    { template: "python.ejs", output: "example.py" }
];

hostLanguages.forEach(function (lang) {
    const template = ejs.compile(fs.readFileSync("templates/" + lang.template, 'utf-8'));
    fs.writeFileSync(lang.output, template({ snippets: embeddedLanguageSnippets }));
});

