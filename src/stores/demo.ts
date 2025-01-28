import { defineStore } from 'pinia'
import type { Locale } from '../types/Locale'
import { fetchDirectus } from 'fari-directus-parser'
import { ref } from 'vue'
import demoConfig from './demoConfig.json'

const exception: string = 'https://ehai.ai.vub.ac.be/demos/visual-question-answering/'

export const useDemoStore = defineStore('demo', () => {
  const loading = ref(false)
  const error = ref<boolean | unknown>(false)
  const locale = ref<Locale>('en')
  const iframeEnabled = ref(true)

  const data = ref(null)

  async function getCMSData() {
    loading.value = true
    error.value = null

    try {
      const { id, slug }: { id: number | null; slug: string } = demoConfig
      if (!id && !slug)
        throw new Error(`No ID or slug provided, current values are ${{ id, slug }}`)

      const demoData = await fetchDirectus(id ? { id } : { slug })

      if (demoData?.app_url?.[locale.value] === exception) iframeEnabled.value = false

      data.value = demoData
    } catch (err) {
      error.value = `Error fetching data: ${err}`
    } finally {
      loading.value = false
    }
  }
  const setLocale = (l: Locale) => (l === 'fr-FR' ? (locale.value = 'fr') : (locale.value = l))

  return {
    getCMSData,
    data,
    iframeEnabled,
    setLocale,
    locale,
  }
})
