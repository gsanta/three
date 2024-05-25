var common = [
  `--format 'progress'`,
  '--parallel 1',
  '--require-module ts-node/register',
  '--require-module tsconfig-paths/register',
  '--require ./test/step-definitions/**/*.ts',
  '--require ./test/support/*.js',
].join(' ');

module.exports = {
  default: common,
};
