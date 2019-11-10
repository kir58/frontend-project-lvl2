#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.3')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig));
  });
program.parse(process.argv);
