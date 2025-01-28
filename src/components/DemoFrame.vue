<template>
  <div class="vue-iframe">
    <iframe
      v-bind="$attrs"
      :src="src"
      ref="iframeEl"
      style="border: none"
      :id="iframeID"
      @load="onIframeLoad"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  src: string
  frameId?: string
  allowedOrigin?: string
}>()

const iframeEl = ref<HTMLIFrameElement | null>(null)

const iframeID = computed(() => props.frameId || uuidv4())

const defaultOrigin = window.location.origin
const allowedOrigin = computed(() => props.allowedOrigin || defaultOrigin)

const onIframeLoad = () => {
  if (iframeEl.value) {
    iframeEl.value.style.visibility = 'visible'
  }
}

onMounted(() =>
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== allowedOrigin.value) return
  }),
)

watch(
  () => props.src,
  (src) => (iframeEl.value.src = src),
)
</script>

<style scoped>
.vue-iframe {
  height: 100vh;
  width: 100vw;

  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
