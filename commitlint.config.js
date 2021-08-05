module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // tdd
        'test',
        'dev',
        'refactor',
        // other code changes
        'fix',
        'perf',
        'style',
        // deploy
        'chore',
        'build',
        'ci',
        'docs',
        // git
        'revert',
        'merge',
      ],
    ],
  },
};
