import {RuleSetRule} from 'webpack';

import {buildCssLoader} from './loaders/buildCssLoader';
import {BuildOptions} from './types/config';

export const buildLoaders = (options: BuildOptions): Array<RuleSetRule> => {
  const {isDev} = options;

  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const cssLoader = buildCssLoader(isDev);

  return [svgLoader, fileLoader, tsLoader, cssLoader];
};
