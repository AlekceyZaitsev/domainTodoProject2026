import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsLoader = {
  test: /\.tsx?$/,
  use: "ts-loader",
  exclude: /node_modules/,
};

const cssLoader = {
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
};

const WebpackConfig = () => {
  return {
    mode: "development",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    module: {
      rules: [tsLoader, cssLoader],
    },
    output: {
      filename: "[name].[contenthash:8].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    devtool: "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "template", "index.html"),
        filename: "index.html",
      }),
      new webpack.ProgressPlugin(),
    ],
    devServer: {
      open: true,
      port: 3000,
    },
  };
};

export default WebpackConfig;
