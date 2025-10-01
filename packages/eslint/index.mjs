import antfu from '@antfu/eslint-config'

export function createBaseConfig(options = {}) {
  const {
    formatters = {
      markdown: 'prettier',
      svg: 'prettier',
      css: 'prettier',
    },
    stylistic = {
      semi: true,
      indent: 'tab',
    },
    rules = {},
    typescript = true,
    vue = false,
  } = options

  return antfu({
    pnpm: true,
    typescript,
    vue,
    formatters,
    stylistic,
    rules: {
      ...rules,
    },
  })
}

export default createBaseConfig()
