import foo from 'bar'

// These strings all contain example embedded languages using the 
// javascript template string syntax


// Batch Example
const bat_string = /*bat*/ `
REM this is a basic BAT file
@echo off
set WORLD="world"
echo "Hello %WORLD%!"

`;


// C++ Example
const cpp_string = /*cpp*/ `
// This is a basic C++ document
#include <iostream>

template<typename T> struct S { T x; };

int main(int argc, char* argv) { 
    std::cout << "Hello world!" << std::endl;
    return 0;
}

`;


// CSS Example
const css_string = /*css*/ `
/* This is basic CSS document */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

h1 {
    color: #0066cc;
}
`;


// HTML Example
const html_string = /*html*/ `
<!DOCTYPE html>
<!-- This is a basic HTML document -->
<html>
<head>
    <meta charset="UTF-8" />
    <title>Basic HTML Example</title>
</head>
<body>
    This is some <a href="http://example.com">example</a>
    HTML with syntax highlighting
</body>
</html>
`;


// INI Example
const ini_string = /*ini*/ `
; This is a basic INI file
[prefs]
user = example
size = 10
theme = dark
last_file = "example.txt"


`;


// Javascript Example
const js_string = /*js*/ `
// This is a basic javascript file
var url = "http://example.com"

function print_url(path) {
    console.log("The URL is", url + "/" + path);
}


`;


// JSON Example
const json_string = /*json*/ `
{
    "comment": "This is a basic JSON file",
    "a": "b",
    "c": true,
    "d": [1,2,3, null],
    "e": 1.02
}
`;


// JSONC Example
const jsonc_string = /*jsonc*/ `
// This is a JSONC (json-with-comments) file
{
    "a": "b",
    "c": true,
    "d": [1,2,3, null],
    "e": 1.02
}

`;


// Python Example
const py_string = /*py*/ `
# This is a basic python file
from os import path

def test():
    if path.exists(__name__):
        print("I'm a real file")

`;


// Shell Example
const sh_string = /*sh*/ `
# This is a basic shell script

print_host() {
    HOSTNAME=\`hostname\`
    if [ -n \${HOSTNAME} ]; then 
        echo "Hello world from \${HOSTNAME}"
    fi
}

`;


// SQL Example
const sql_string = /*sql*/ `
-- This is a basic SQL document
SELECT users.id, orders.product, orders.price
FROM users
INNER JOIN orders
  ON users.id = orders.id
WHERE orders.price > 100 OR orders.product = 'Table'
  
`;


// TOML Example
const toml_string = /*toml*/ `
# Basic TOML document

url = "http://example.com"
name = "Sample Document"

[user]
name = "Foobar"
id = 1234
active = true
`;


// XML Example
const xml_string = /*xml*/ `
<?xml version="1.0" encoding="UTF-8"?>
<!-- Basic XML document -->
<user active="true" id="1234">
  <name>Foobar</name>
  <desc> a &lt; b </desc>
  <![CDATA[
  Unparsed string data
  ]]>
</user>
`;


// YAML Example
const yaml_string = /*yaml*/ `
# This is a basic YAML document
users: &id1234
  - foobar: 
    id: 1234
    active: true
    group: "main"
    links: [ *id2345, *id2346, null, !!str false ]
    desc: >
  A lengthy multiline
  description string

  
`;


// C Example
const c_string = /*c*/ `
/* Basic C document - with notable differences from C++ */
int template = 3;
int static_assert = 4;

int
add(a, b)
int a, b;
{
  return a + b;
}

`;



    