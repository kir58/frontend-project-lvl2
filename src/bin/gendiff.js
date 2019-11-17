#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'txt')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });
program.parse(process.argv);
