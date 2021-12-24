import pluginTypeScript from "@rollup/plugin-typescript";
import pluginCommonJS from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";

export default [
    {
        input: "src/main.ts",
        output: [
            {
                file: "dist/index.js",
                format: "es",
                exports: "named",
                sourcemap: "inline"
            }
        ],
        plugins: [
            pluginTypeScript(),
            pluginNodeResolve({
                browser: false
            }),
            pluginCommonJS({
                extensions: [ ".js", ".ts" ]
            })
        ]
    }
]