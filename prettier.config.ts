import type { Config } from 'prettier'

const config: Config = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
