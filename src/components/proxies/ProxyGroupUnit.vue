<template>
  <div class="overflow-hidden rounded-[var(--radius-box)] border border-base-300/60 bg-base-100/60">
    <div
      v-for="(name, index) in names"
      :key="name"
      class="px-4 py-4 max-md:px-3"
      :class="index > 0 && 'border-t border-base-300/60'"
    >
      <ProxyEmbeddedGroup :name="name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProxyEmbeddedGroup from './ProxyEmbeddedGroup.vue'

defineProps<{
  names: string[]
}>()
</script>
