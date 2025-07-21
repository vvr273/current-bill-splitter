// uno.config.ts
import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(), // enables attributes like <div text="xl white">
    presetIcons(),       // use icon classes like i-carbon-battery-charging
  ],
})
