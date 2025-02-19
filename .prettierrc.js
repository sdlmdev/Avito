module.exports = {
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: false,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^api(/.*)$',
    '^assets(/.*)$',
    '^consts(/.*)$',
    '^hooks(/.*)$',
    '^features(/.*)$',
    '^shared(/.*)$',
    '^pages(/.*)$',
    '^store(/.*)$',
    '^types(/.*)$',
    '^[../]',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
