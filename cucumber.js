var common = [
  `--format 'progress'`,
  '--parallel 0',
  '--require-module ts-node/register',
  '--require-module tsconfig-paths/register',
  '--require ./test/step-definitions/**/*.ts',
  '--require ./test/step-definitions/*.js',
  '--require ./test/support/*.js',
].join(' ');

module.exports = {
  default: common,
};
