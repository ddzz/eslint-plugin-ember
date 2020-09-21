'use strict';

const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const configs = require('../lib').configs;

const CONFIG_NAMES = Object.keys(configs);

describe('config setup is correct', function () {
  it('should have a list of exported configs and config directory that match', function () {
    const filePath = path.join(__dirname, '..', 'lib', 'config');
    const files = readdirSync(filePath);

    // eslint-disable-next-line jest/prefer-strict-equal
    expect(CONFIG_NAMES).toEqual(
      files.filter((file) => !file.startsWith('.')).map((file) => file.replace('.js', ''))
    );
  });

  it('should mention all configs in the README', function () {
    const filePath = path.join(__dirname, '..', 'README.md');
    const file = readFileSync(filePath, 'utf8');

    // We don't bother mentioning the `base` config in the README.
    const CONFIG_NAMES_WITHOUT_BASE = CONFIG_NAMES.filter((configName) => configName !== 'base');

    CONFIG_NAMES_WITHOUT_BASE.forEach((configName) => expect(file).toContain(configName));
  });
});
