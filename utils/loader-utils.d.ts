import type { LoaderContext } from 'webpack';

declare module 'loader-utils' {
  function interpolateName<OptionsType>(
    loaderContext: LoaderContext<OptionsType>,
    name: string,
    options?: InterpolateOption,
  ): string;
}
