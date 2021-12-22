/// <reference path="./loader-utils.d.ts"/>
import type { LoaderContext } from 'webpack';
import { interpolateName } from 'loader-utils';

export type Options = {
  name?: string;
  context?: string;
};

type GLTFAsset = {
  uri?: string;
};

type GLTF = {
  buffers?: GLTFAsset[];
  images?: GLTFAsset[];
};

export default async function loader(this: LoaderContext<Options>, input: string) {
  this.async();
  const {
    name = '[md4:contenthash:20].[ext]',
    context = this.rootContext,
  } = this.getOptions() ?? {};

  const gltf = JSON.parse(input) as GLTF;

  const { fileTypeFromBuffer } = await import('file-type');
  await Promise.all([
    ...gltf.buffers ?? [],
    ...gltf.images ?? [],
  ].map(async ({ uri }, i, array) => {
    if (!uri || uri.startsWith('data:')) return;
    const resourcePath = `./${uri}`;
    this.addBuildDependency(resourcePath);
    const content = await new Promise<Buffer>((resolve, reject) => {
      this.loadModule(resourcePath, (error, source) => (error
        ? reject(error)
        : resolve(Buffer.from(source))));
    });
    const { mime } = await fileTypeFromBuffer(content);
    Object.assign(array[i], { uri: `data:${mime};base64,${content.toString('base64')}` });
  }));

  const content = JSON.stringify(gltf);
  const path = interpolateName(this, name, { context, content });
  this.emitFile(path, content, null, { immutable: true });
  this.callback(null, `export default __webpack_public_path__ + ${JSON.stringify(path)}`);
}
