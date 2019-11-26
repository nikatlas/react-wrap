import WrapperLib from './lib';

import Native from './lib/Resolvers/NativeResolver'
import Dom from './lib/Resolvers/DomResolver'


export default WrapperLib;

export const Wrapper = WrapperLib;

export const NativeResolver = Native;
export const DomResolver = Dom;