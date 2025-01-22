<template>
  <nav>
    <FDemoAppBar
      v-if="router.currentRoute.value.name !== 'home'"
      dense
      class="appbar"
      @exit="router.push('/')"
    />
  </nav>
  <main class="content">
    <RouterView :locale="locale" @start="startDemo" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import { onMounted } from 'vue'

import { useDemoStore } from '@/stores/demo'
import { FDemoAppBar } from 'fari-component-library'
import { storeToRefs } from 'pinia'

const router = useRouter()

const { getCMSData } = useDemoStore()
const { iframeEnabled, data, locale } = storeToRefs(useDemoStore())

onMounted(getCMSData)

function startDemo() {
  if (iframeEnabled.value) return router.push('/frame')
  window.open(data.value.app_url[locale.value], '_newtab')
}
</script>

<style scoped lang="scss">
nav {
  width: 100%;
  position: absolute;
  z-index: 2;
}

.content {
  width: 100vw;
  height: 100vh;
}
</style>
