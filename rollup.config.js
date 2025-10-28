import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        postcss({
            extract: true,
            minimize: true,
            sourceMap: true
        }),
        typescript({
            tsconfig: './tsconfig.json'
        })
    ]
};