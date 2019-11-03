#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(firstConfig, secondConfig);
  });
program.parse(process.argv);
