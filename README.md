# extended-embedded-languages README

This is a Visual Studio Code extension which enables better syntax
highlighting for programming languagess embedded as strings within other
programming language files. 

For example, if you are writing a Python script, and have snippets of
SQL embedded as strings within that file, you may want to syntax
highlight the SQL as if it were its own document.

This is similar to how you can select syntax highlighting within
Markdown documents using a language specifier (e.g. ` ```py `)


## Features

This supplements existing syntax highlighters by injecting new behavior
when specific types of multiline string delimiters or "HERE DOC" sigils are found.
It does not contain its own language definitions. 

Within the embedded language block, your editor will behave as if it is
editing the embedded language. For example if you are editing SQL within
a C++ document, the VSCode "Toggle Line Comment" command will prefix
lines with `--` not `//`. 

## Language Support

Here is a grid showing which languages are embeddable into which other
languages:

| Embedded Languages | Prefix          | Notes |
| ------------------ | --------------- | ----- |
| C++                | cpp             |       |
| CSS                | css             |       |
| GLSL               | glsl            |       |
| HTML               | html            |       |
| Ini                | ini             |       |
| Javascript         | js, javascript  |       |
| JSON               | json            |       |
| Python             | py, python      |       |
| Shell Script       | shell, bash, sh |       |
| SQL                | sql             |       |
| TOML               | toml            |       |
| XML                | xml             |       |
| YAML               | yaml            |       |
|                    |

### Host Language - C++

C++ uses _raw strings_ to specify the language. 

A raw string in C++ looks like 
```cpp
auto s = R"( ...text )";
```

But between the `"` and "(" an arbitrary token can be placed which we use here to specify the language:

```cpp
auto s1 = R"json( {"a": "b", "c": [1,2,3]} )json";

auto s2 = R"sql( 
    SELECT * FROM users
    WHERE id = 1234; 
)sql";

auto s3 = R"py(
if __name__ == "__main__":
  print "hello world!"
)py";

```

In addition - we also support a _leading comment_ in the embedded
language.

```cpp
auto s1 = R"(#py
from os import path
)"

auto s2 = R("--sql
INSERT INTO users VALUES 2345, "foobar";
);
```

### Host language - Python

Python multiline strings do not have custom terminators the way C++,
Perl or other languages do. As such, we rely on _leading comments_ to
identify a language. This comment must be immediately after the `'''` or
`"""` which starts a multiline string

```py
def JSON(x) return x

s = r"""--sql
SELECT * FROM events WHERE user_id = 1234;
"""

# Is there a way to format JSON?
s = r"""
{"a":"b", "c": [1,2,3]}
"""

```



## Requirements


## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.0

Initial release of Extended Embedded Languages

