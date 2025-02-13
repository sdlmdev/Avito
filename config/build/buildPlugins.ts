import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
  DefinePlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin,
  WebpackPluginInstance,
} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

import {BuildOptions} from './types/config';

export const buildPlugins = (
  options: BuildOptions,
): Array<WebpackPluginInstance> => {
  const {paths, isDev, apiUr} = options;

  const devPlugins = () => [
    new HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ];

  const plugins = [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUr),
    }),
    new ReactRefreshPlugin(),
  ];

  if (isDev) {
    plugins.push(...devPlugins());
  }

  return plugins;
};
