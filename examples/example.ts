import foo from 'bar'

// These strings all contain example embedded languages using the
// javascript/typescript template string syntax

//////////////////////////////////////////////////////////////////////
// Documentation Examples:

// Tagged template identity function
const sql = (strings, ...values) => String.raw({raw: strings}, ...values);

const s1 = /*sql*/  `
SELECT user_name FROM users WHERE id = 1234
`;

// ` and $ need to be escaped within template strings
const s2 = /*py*/ `
print(f" \`hello world', from \${__name__}");
`;

// Tagged template, requires a sql() function
const s3 = sql`
SELECT user_name FROM users WHERE id = 1234
`;

//////////////////////////////////////////////////////////////////////
// Embedded Examples:



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
const url = 'http://example.com';

/* eslint-disable require-jsdoc */
export function printUrl(path) {
    console.log('The URL is', url + '/' + path);
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


// HLSL Example
const hlsl_string = /*hlsl*/ `
// A simple HLSL shader
struct VertexInput {
    float3 position : POSITION;
};

VertexOutput main(VertexInput input) {
    VertexOutput output;
    output.position = mul(float4(input.position, 1.0), model_view_proj);
    return output;
}

`;


// GLSL Example
const glsl_string = /*glsl*/ `
// A simple GLSL shader
uniform mat4 model_view_proj;

in vec3 position;

void main() {
    gl_Position = model_view_proj * vec4(position, 1.0);
}

`;


// Metal Example
const metal_string = /*metal*/ `
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
`;


// WGSL Example
const wgsl_string = /*wgsl*/ `
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

`;


// Lua Example
const lua_string = /*lua*/ `
-- This is a basic Lua script
local number = 3
if number >= 100:
    print("Too large: " .. number)
else
    print("OK")
    
`;


// Makefile Example
const make_string = /*make*/ `
# Makefile example
*.o : *.c
    gcc -c \$< -o \$@

program: main.o utils.o
    gcc \$< -o program
`;


// GraphQL Example
const graphql_string = /*graphql*/ `
# Basic GraphQL query
query {
  book(id: "123") {
    title
    author
    publicationYear
  }
}

`;


// TypeScript Example
const typescript_string = /*typescript*/ `
// Simple TypeScript example
function addNumbers(a: number, b: number): number {
    return a + b;
}
const result = addNumbers(5, 10);

`;


// LaTeX Example
const latex_string = /*latex*/ `
% Basic LaTeX document
\documentclass{article}
\begin{document}
Hello, \LaTeX!
\end{document}

`;


// TeX Example
const tex_string = /*tex*/ `
% Basic TeX document
\input plain

Hello, \TeX!

\bye
`;


// Graphviz Example
const graphviz_string = /*graphviz*/ `
// Graphviz example
digraph G {
  A -> B -> C -> D;
  B -> D;
}

`;


// ARM Assembly Example
const arm_string = /*arm*/ `
@ ARM syntax example
mov R1, #100
loop:
  sub R1, #1
  bne loop

`;


// x86 / x64 Assembly Example
const x86_string = /*x86*/ `
; x86 assembly sample
mov cx, 100
start:
    dec cx
    jnz start

`;


// Handlebars Example
const hbs_string = /*hbs*/ `
<ul class="people_list">
  {{#each people}}
    <li>{{this}}</li>
  {{/each}}
</ul>
`;


// PowerShell Example
const ps1_string = /*ps1*/ `
function Add-Numbers (\$num1, \$num2) {
    \$sum = \$num1 + \$num2
    return \$sum
}

`;


// Markdown Example
const md_string = /*md*/ `
# Markdown example

This is a (paragraph)[http://example.com] of text in **bold** and *italic*.

## Heading 2

- Item 1
- Item 2
- Item 3

> This is a blockquote.


`;


// Go Example
const go_string = /*go*/ `
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

`;


