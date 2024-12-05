#!/usr/bin/env node

import { program as commander } from 'commander';
import generateDiff from '../src/index.js';

export function createProgram() {
  const program = commander
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .argument('<filepath1>', 'path to first file')
    .argument('<filepath2>', 'path to second file')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
      console.log(generateDiff(filepath1, filepath2, options.format));
    });

  return program;
}


createProgram().parse();
