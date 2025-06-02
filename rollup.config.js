
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'custom-thermostat-card.ts',
  output: {
    file: 'dist/custom-thermostat-card.js',
    format: 'es',
  },
  plugins: [resolve(), commonjs(), typescript(), terser()],
};