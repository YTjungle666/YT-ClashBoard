<script setup lang="ts">
defineProps<{
  title: string
  titleMeta?: string
  showDivider?: boolean
  collapsed?: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<template>
  <section class="flex flex-col gap-3 pb-4">
    <div
      v-if="showDivider"
      class="border-base-300/55 mb-1 border-t"
    />
    <div
      class="cursor-pointer overflow-hidden"
      @click.stop="$emit('toggle')"
    >
      <div class="flex w-full items-center justify-between gap-2 text-left">
        <div class="flex min-w-0 flex-1 items-center gap-2">
          <div
            v-if="$slots.handle"
            class="shrink-0"
            @click.stop
          >
            <slot name="handle" />
          </div>
          <p class="text-base-content min-w-0 flex-1 text-left text-base font-medium">
            {{ title }}
            <span
              v-if="titleMeta"
              class="text-base-content/60 ml-1 text-sm font-normal"
            >
              {{ titleMeta }}
            </span>
          </p>
        </div>
        <div class="shrink-0">
          <slot name="action" />
        </div>
      </div>
      <div v-if="collapsed">
        <slot name="collapsed" />
      </div>
    </div>
    <div v-if="!collapsed">
      <slot />
    </div>
  </section>
</template>
