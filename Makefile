

.PHONY: examples all lint fix setup

all: examples syntax

lint:
	cd utilities ; eslint .

fix:
	cd utilities ; eslint --fix .

setup:
	sudo npm install -g @vscode/vsce
	cd utilities ; npm install

examples:
	cd utilities ; node ./example_assembler.js

syntax:
	cd utilities ; node ./syntax_assembler.js

package:
	vsce package --githubBranch trunk

publish:
	vsce publish --githubBranch trunk


