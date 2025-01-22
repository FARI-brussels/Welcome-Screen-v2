<template>
  <div class="start-screen">
    <video v-if="data?.video" autoplay muted loop class="background-video">
      <source :src="data.video" type="video/mp4" />
    </video>
    <div class="heading">
      <div class="title">
        <FTitle class="title"> {{ data?.title[locale] }}</FTitle>
        <FButtonIcon name="tooltip" color="blue-light" class="tooltip" @click="toggleCard" />
      </div>
      <FSubTitle class="subtitle"> {{ data?.topic?.[locale] }} </FSubTitle>
    </div>

    <FButton label="Start" type="primary" class="start-button" on-dark @click="$emit('start')" />

    <FSlideTransition :show="showCard">
      <FCard v-if="showCard" @close="toggleCard" @update:locale="setLocale" class="card">
        {{ data.description[locale] }}

        <div class="researchers-container">
          <span class="researchers">
            research head: <span class="research-head color-black"> {{ data.research_head }} </span>
          </span>
          <span class="researchers">
            research lead: <span class="research-lead color-black"> {{ data.research_lead }} </span>
          </span>
          <div class="flex">
            <img v-for="sdg in data.sdg_images" :key="sdg" :src="sdg" class="sdg mr-md mt-sm" />
          </div>
        </div>

        <template #footer>
          <div v-if="data?.logos">
            <img v-for="logo in data.logos" :src="logo" :key="logo" class="card-logo" />
          </div>
        </template>
      </FCard>
    </FSlideTransition>
    <div class="backdrop" :class="{ 'backdrop-active': showCard }"></div>
    <FFooter />
  </div>
</template>

<script setup lang="ts">
import {
  FButton,
  FTitle,
  FSubTitle,
  FButtonIcon,
  FFooter,
  FSlideTransition,
  FCard,
} from 'fari-component-library'
import { useDemoStore } from '@/stores/demo'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

defineEmits(['start'])

const { data, locale } = storeToRefs(useDemoStore())
const { setLocale } = useDemoStore()

const showCard = ref(false)
const toggleCard = () => (showCard.value = !showCard.value)
</script>

<style scoped lang="scss">
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
.start-screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: radial-gradient(circle, rgba(75, 118, 212, 0.6) 0%, rgba(24, 62, 145, 1) 70%);
  background-size: 100%;
  justify-content: space-around;
  align-items: center;
  flex: 0 0 auto;
  position: relative;
  z-index: 0;
}

.heading {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8rem;
  margin-bottom: auto;

  .title {
    gap: 1rem;
    display: flex;
  }
}

.start-button {
  margin-bottom: auto;
  width: fit-content;
}
.card {
  position: absolute;
  top: 20%;
  left: 20%;
  z-index: 2;
}

.backdrop {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 62, 145, 0.4);
  backdrop-filter: blur(0);
  z-index: 1;
  transition: all 100ms;

  &-active {
    visibility: visible;
    opacity: 1;
    backdrop-filter: blur(2px);
    transition: all 300ms;
  }
}

.researchers-container {
  margin-top: auto;
  display: flex;
  flex-direction: column;
}

.researchers {
  color: #888;
  text-transform: uppercase;
}

.card-logo {
  height: 3.5rem;
  margin-right: 2rem;
}
.sdg {
  height: 3.5rem;
  width: 3.5rem;
}
</style>
