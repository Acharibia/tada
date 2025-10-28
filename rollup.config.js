import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            interop: 'auto'
        },
        {
            file: 'dist/index.js',
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