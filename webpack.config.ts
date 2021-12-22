import 'dotenv/config';
import type { Configuration } from 'webpack';
import { ProvidePlugin } from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

export default function config(
  { configFile = 'tsconfig.ecs.json', scene = false, lib = false } = {},
  { mode = 'production' } = {},
): Configuration {
  return {
    devtool: mode === 'development' && 'eval-cheap-module-source-map',
    entry: scene ? { main: './ecs/main.ts' } : { Banca: './ecs/Banca.ts' },
    output: {
      clean: true,
      publicPath: 'dist/',
      ...lib && { library: { type: 'commonjs2' } },
    },
    ...lib && { externals: 'decentraland-ecs' },
    resolve: { extensions: ['.ts', '.js'] },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: { configFile },
        },
        {
          test: /node_modules\/decentraland-ecs\//,
          loader: 'imports-loader',
          options: { additionalCode: 'this.self = this;' },
        },
        { test: /\.gltf$/, loader: require.resolve('./utils/gltf-loader') },
        { test: /\.(png|jpg|glb|bin|mp3)$/, type: 'asset' },
      ],
    },
    plugins: [
      new ESLintPlugin({ extensions: ['ts', 'js'] }),
      new ProvidePlugin(Object.fromEntries([
        'OnChanged', 'OnClick', 'OnPointerDown', 'OnTextSubmit',
        'UICanvas', 'UIContainerRect', 'UIContainerStack', 'UIImage', 'UIInputText', 'UIText',
        'ActionButton', 'AnimationState', 'Animator', 'Attachable', 'Camera', 'Color4', 'Component',
        'Entity', 'Font', 'Fonts', 'GLTFShape', 'Input', 'MessageBus',
        'Quaternion', 'Texture', 'Transform', 'Vector3', 'engine',
      ].map((definition) => [definition, ['decentraland-ecs', definition]]))),
    ],
  };
}
