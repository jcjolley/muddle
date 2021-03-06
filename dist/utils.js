"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const rm = require("rimraf");
const path = require("path");
exports.cleanup = (filename) => {
    rm.sync(`${filename.slice(0, -3)}.temp.js`);
};
exports.muddleStr = str => {
    const colors = ['blue', 'magenta', 'magentaBright', 'blueBright'];
    return str.split('').map(c => chalk_1.default[colors[getRandomInt(0, colors.length)]](c)).join('');
};
exports.getOutFilename = (program, filename) => {
    let outname = getFilenameSansExt(program.outFile ? program.outFile : filename);
    if (program.outDir)
        return path.normalize(path.join(program.outDir, outname));
    if (program.watchDir)
        return path.normalize(path.join(program.watchDir, outname));
    return outname;
};
exports.replaceInStrIfScriptor = (a, b, str) => {
    const scriptors = ['s\.', 'db\.', 'fs\.', 'ms\.', 'ls\.', 'ns\.', '4s\.', '3s\.', '2s\.', '1s\.'];
    const lookahead = `(?=${scriptors.join('|')})`;
    return str.split('\n')
        .map(line => line.replace(new RegExp(`${a}${lookahead}`, "g"), b))
        .join('\n');
};
exports.anonymizeFirstFunction = str => str.replace(/^.*?\(/, "function(");
exports.isChildOf = (child, parent) => {
    const c = path.resolve(child);
    const p = path.resolve(parent);
    return (c !== p) && p.split(path.sep).every((t, i) => c.split(path.sep)[i] === t);
};
const getFilenameSansExt = (filename) => {
    const ext = path.extname(filename);
    return path.basename(filename, ext);
};
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
