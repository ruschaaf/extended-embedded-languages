# Change Log

All notable changes to the "extended-embedded-languages" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [v1.0.0]

Added embedded languages: Lua, Makefile, GraphQL, TypeScript, LaTeX,
TeX, and Graphviz

Added experimental generation of embedded langauge snippets - these are
not added to VSCode by default yet, but they could be manually added to
a project. If you
can use the `sql` snippet and depending on the host language you might
get
```cpp
//c++
R"sql(
)sql"
```
or 
```py
#python
"""--sql
"""
```

Clarified "snippets" vs. "examples" in the code

## [v0.0.2]

New host language: Javascript

New embedded languages: hlsl, glsl, wgsl, Metal

Refactored code and added ESLint for linting

Regexp improvements for better matching

## [v0.0.1]

- Initial release