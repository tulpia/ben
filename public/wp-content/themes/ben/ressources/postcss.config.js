module.exports = ({ options }) => ({
    plugins: {
        "autoprefixer": {},
        "postcss-preset-env": {},
        "cssnano": options.dev ? false : {
        preset: ["default", {
            discardComments: { removeAll: true }
            }]
        }
    }
});