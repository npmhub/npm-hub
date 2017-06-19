import nodeResolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

export default [
  'src/index.js',
  'src/background.js',
  'src/options.js'
].map(entry => ({
  entry,
  dest: entry.replace('src', 'extension'),
  plugins: [
    nodeResolve({
      browser: true
    }),
    commonJS()
  ],
  format: 'iife',
  sourceMap: process.env.SOURCEMAP || false
}));
