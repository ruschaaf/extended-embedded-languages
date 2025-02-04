#include <iostream>

// Usage:
// In C++ we use raw strings with a tag to indicate the embedded language.
// The tag must begin with the embedded languages' ID (see docs)

//////////////////////////////////////////////////////////////////////
// Documentation Examples:

auto s1 = R"json(
  {"a": "b", "c": [1,2,3]}
)json";

auto s2 = R"sql(
    SELECT * FROM USERS
    WHERE id = 1234;
)sql";

auto s3 = R"py(
    if __name__ == "__main__":
        print("hello world!")
)py";

//////////////////////////////////////////////////////////////////////
// Embedded Examples:
// These are examples of all the embedded languages 


//////////////////////////////////////////////////////////////////////
// Batch Example
static const char* bat_string = R"bat(
REM this is a basic BAT file
@echo off
set WORLD="world"
echo "Hello %WORLD%!"

)bat";


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
// INI Example
static const char* ini_string = R"ini(
; This is a basic INI file
[prefs]
user = example
size = 10
theme = dark
last_file = "example.txt"


)ini";


//////////////////////////////////////////////////////////////////////
// Javascript Example
static const char* js_string = R"js(
// This is a basic javascript file
const url = 'http://example.com';

/* eslint-disable require-jsdoc */
export function printUrl(path) {
    console.log('The URL is', url + '/' + path);
}


)js";


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
// JSONC Example
static const char* jsonc_string = R"jsonc(
// This is a JSONC (json-with-comments) file
{
    "a": "b",
    "c": true,
    "d": [1,2,3, null],
    "e": 1.02
}

)jsonc";


//////////////////////////////////////////////////////////////////////
// Python Example
static const char* py_string = R"py(
# This is a basic python file
from os import path

def test():
    if path.exists(__name__):
        print("I'm a real file")

)py";


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
// SQL Example
static const char* sql_string = R"sql(
-- This is a basic SQL document
SELECT users.id, orders.product, orders.price
FROM users
INNER JOIN orders
  ON users.id = orders.id
WHERE orders.price > 100 OR orders.product = 'Table'
  
)sql";


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
// HLSL Example
static const char* hlsl_string = R"hlsl(
// A simple HLSL shader
struct VertexInput {
    float3 position : POSITION;
};

VertexOutput main(VertexInput input) {
    VertexOutput output;
    output.position = mul(float4(input.position, 1.0), model_view_proj);
    return output;
}

)hlsl";


//////////////////////////////////////////////////////////////////////
// GLSL Example
static const char* glsl_string = R"glsl(
// A simple GLSL shader
uniform mat4 model_view_proj;

in vec3 position;

void main() {
    gl_Position = model_view_proj * vec4(position, 1.0);
}

)glsl";


//////////////////////////////////////////////////////////////////////
// Metal Example
static const char* metal_string = R"metal(
// A simple Metal shader
struct VertexOutput {
    float4 position [[position]];
};

vertex VertexOutput vertexShader(const device packed_float3* vertex_buffer [[buffer(0)]],
                                 constant packed_float4x4& model_view_proj [[buffer(1)]],
                                 uint vid [[vertex_id]]) {
    VertexOutput output;
    float3 position = vertex_buffer[vid];
    output.position = model_view_proj * float4(position, 1.0);
    return output;
}
)metal";


//////////////////////////////////////////////////////////////////////
// WGSL Example
static const char* wgsl_string = R"wgsl(
// A simple WGSL shader
struct VertexOutput {
    [[builtin(position)]] position : vec4<f32>;
};

[[stage(vertex)]]
fn main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    output.position = uniforms.model_view_proj * vec4<f32>(input.position, 1.0);
    return output;
}

)wgsl";


//////////////////////////////////////////////////////////////////////
// Lua Example
static const char* lua_string = R"lua(
-- This is a basic Lua script
local number = 3
if number >= 100:
    print("Too large: " .. number)
else
    print("OK")
    
)lua";


//////////////////////////////////////////////////////////////////////
// Makefile Example
static const char* make_string = R"make(
# Makefile example
*.o : *.c
    gcc -c $< -o $@

program: main.o utils.o
    gcc $< -o program
)make";


//////////////////////////////////////////////////////////////////////
// GraphQL Example
static const char* graphql_string = R"graphql(
# Basic GraphQL query
query {
  book(id: "123") {
    title
    author
    publicationYear
  }
}

)graphql";


//////////////////////////////////////////////////////////////////////
// TypeScript Example
static const char* typescript_string = R"typescript(
// Simple TypeScript example
function addNumbers(a: number, b: number): number {
    return a + b;
}
const result = addNumbers(5, 10);

)typescript";


//////////////////////////////////////////////////////////////////////
// LaTeX Example
static const char* latex_string = R"latex(
% Basic LaTeX document
\documentclass{article}
\begin{document}
Hello, \LaTeX!
\end{document}

)latex";


//////////////////////////////////////////////////////////////////////
// TeX Example
static const char* tex_string = R"tex(
% Basic TeX document
\input plain

Hello, \TeX!

\bye
)tex";


//////////////////////////////////////////////////////////////////////
// Graphviz Example
static const char* graphviz_string = R"graphviz(
// Graphviz example
digraph G {
  A -> B -> C -> D;
  B -> D;
}

)graphviz";


//////////////////////////////////////////////////////////////////////
// ARM Assembly Example
static const char* arm_string = R"arm(
@ ARM syntax example
mov R1, #100
loop:
  sub R1, #1
  bne loop

)arm";


//////////////////////////////////////////////////////////////////////
// x86 / x64 Assembly Example
static const char* x86_string = R"x86(
; x86 assembly sample
mov cx, 100
start:
    dec cx
    jnz start

)x86";


//////////////////////////////////////////////////////////////////////
// Handlebars Example
static const char* hbs_string = R"hbs(
<ul class="people_list">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
)hbs";


//////////////////////////////////////////////////////////////////////
// PowerShell Example
static const char* ps1_string = R"ps1(
function Add-Numbers ($num1, $num2) {
    $sum = $num1 + $num2
    return $sum
}

)ps1";


//////////////////////////////////////////////////////////////////////
// Markdown Example
static const char* md_string = R"md(
# Markdown example

This is a (paragraph)[http://example.com] of text in **bold** and *italic*.

## Heading 2

- Item 1
- Item 2
- Item 3

> This is a blockquote.


)md";


//////////////////////////////////////////////////////////////////////
// Go Example
static const char* go_string = R"go(
package main

import (
	"fmt"
	"os"
)

type User struct {
	Name string
}

func (u *User) Greet() {
	fmt.Printf("Hello, %s!\n", u.Name)
}

func main() {
	user := &User{Name: "World"}
	if len(os.Args) > 1 {
		user.Name = os.Args[1]
	}
	user.Greet()
}

)go";




//////////////////////////////////////////////////////////////////////
// Test cases - these should all be HIGHLIGHTED
auto s1 = R"sql(SELECT foo FROM bar;)sql";

auto s2 = R"sql(
    SELECT foo FROM bar;
)sql";

auto s3 = R"sql:abc(
    SELECT foo FROM bar
)sql:abc";

auto s4 = u8R"sql(SELECT foo FROM bar;)sql";
auto s5 = LR"sql(SELECT foo FROM bar;)sql";
auto s6 = UR"sql(SELECT foo FROM bar;)sql";

#define x R"sql(SELECT foo FROM bar;)sql";


//////////////////////////////////////////////////////////////////////
// Test cases - these should all be UNHIGHLIGHTED

//R"sql(SELECT foo FROM bar;)sql";
/*
    R"sql(SELECT foo FROM bar;)sql";
*/

auto s7 = "SELECT foo FROM bar";

auto s8 = R"outer( 
    R"sql(SELECT foo FROM bar;)sql";
)outer";

#if 0
#error R"sql(SELECT foo FROM bar;)sql"
#endif

//////////////////////////////////////////////////////////////////////
// Regular C++ code - to make sure embedded languages aren't leaking

#define FOOBAR(...) __VA_ARGS__
template<typename T> void run_obj(const T& t) { t.run(); }
