#!/usr/bin/env node

const fs = require("fs");
const { parse } = require("comment-json");
const path = require("path");
const tsNode = require("ts-node");

const tsconfig = parse(
    fs.readFileSync(path.join(__dirname, "../../tsconfig.json")).toString()
);
tsNode.register({
    transpileOnly: true,
    compilerOptions: tsconfig.compilerOptions,
});

require("./bin.ts");
