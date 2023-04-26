#include <iostream>

// These strings all contain example embedded languages using the 
// C++ raw string syntax


// Batch Example
static const char* bat_string = R"bat(
REM this is a basic BAT file
@echo off
set WORLD="world"
echo "Hello %WORLD%!"

)bat";


// C++ Example
static const char* cpp_string = R"cpp(
// This is a basic C++ document
#include <iostream>

template<typename T> struct S { T x; };

int main(int argc, char* argv) { 
    std::cout << "Hello world!" << std::endl;
    return 0;
}

)cpp";


// CSS Example
static const char* css_string = R"css(
/* This is basic CSS document */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

h1 {
    color: #0066cc;
}
)css";


// HTML Example
static const char* html_string = R"html(
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
)html";


// INI Example
static const char* ini_string = R"ini(
; This is a basic INI file
[prefs]
user = example
size = 10
theme = dark
last_file = "example.txt"


)ini";


// Javascript Example
static const char* js_string = R"js(
// This is a basic javascript file
var url = "http://example.com"

function print_url(path) {
    console.log("The URL is", url + "/" + path);
}


)js";


// JSON Example
static const char* json_string = R"json(
{
    "comment": "This is a basic JSON file",
    "a": "b",
    "c": true,
    "d": [1,2,3, null],
    "e": 1.02
}
)json";


// JSONC Example
static const char* json_string = R"json(
// This is a JSONC (json-with-comments) file
{
    "a": "b",
    "c": true,
    "d": [1,2,3, null],
    "e": 1.02
}

)json";


// Python Example
static const char* py_string = R"py(
# This is a basic python file
from os import path

def test():
    if path.exists(__name__):
        print("I'm a real file")

)py";


// Shell Example
static const char* sh_string = R"sh(
# This is a basic shell script

print_host() {
    HOSTNAME=`hostname`
    if [ -n ${HOSTNAME} ]; then 
        echo "Hello world from ${HOSTNAME}"
    fi
}

)sh";


// SQL Example
static const char* sql_string = R"sql(
-- This is a basic SQL document
SELECT users.id, orders.product, orders.price
FROM users
INNER JOIN orders
  ON users.id = orders.id
WHERE orders.price > 100 OR orders.product = 'Table'
  
)sql";


// TOML Example
static const char* toml_string = R"toml(
# Basic TOML document

url = "http://example.com"
name = "Sample Document"

[user]
name = "Foobar"
id = 1234
active = true
)toml";


// XML Example
static const char* xml_string = R"xml(
<?xml version="1.0" encoding="UTF-8"?>
<!-- Basic XML document -->
<user active="true" id="1234">
  <name>Foobar</name>
  <desc> a &lt; b </desc>
  <![CDATA[
  Unparsed string data
  ]]>
</user>
)xml";


// YAML Example
static const char* yaml_string = R"yaml(
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

  
)yaml";


// C Example
static const char* c_string = R"c(
/* Basic C document - with notable differences from C++ */
int template = 3;
int static_assert = 4;

int
add(a, b)
int a, b;
{
  return a + b;
}

)c";



int main(const char* argv, int argc)
{
    return 0;
}
