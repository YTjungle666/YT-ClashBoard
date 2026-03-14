import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/tippy.css'
import './assets/main.css'
import './assets/theme.css'
import { initializePersistentStorage } from './helper/persistentStorage'

const bootstrap = async () => {
  await initializePersistentStorage()
  await import('@/helper/dayjs')

  const [{ createApp }, { default: App }, { loadFonts }, { applyCustomThemes }, { i18n }, router] =
    await Promise.all([
      import('vue'),
      import('./App.vue'),
      import('./assets/load-fonts'),
      import('./helper'),
      import('./i18n'),
      import('./router'),
    ])

  applyCustomThemes()
  loadFonts()

  const app = createApp(App)

  app.use(router.default)
  app.use(i18n)
  app.mount('#app')
}

void bootstrap()
