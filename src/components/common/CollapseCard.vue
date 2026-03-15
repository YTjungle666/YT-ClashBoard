<template>
  <div :class="`collapse ${showCollapse ? 'collapse-open' : 'collapse-close'}`">
    <div
      class="collapse-title cursor-pointer overflow-hidden pr-4"
      @click="showCollapse = !showCollapse"
    >
      <slot name="title" />
      <slot
        v-if="!showCollapse"
        name="preview"
      />
    </div>
    <div
      class="collapse-content p-0"
      @transitionend="handlerTransitionEnd"
    >
      <div
        v-if="shouldRenderContent"
        class="p-4 pt-0 max-md:p-2"
        :class="[
          contentScrollable && 'max-h-108 overflow-y-auto',
          contentScrollable && SCROLLABLE_PARENT_CLASS,
          !showCollapse && 'opacity-0',
        ]"
      >
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SCROLLABLE_PARENT_CLASS } from '@/helper/utils'
import { isWindowResizing } from '@/helper/windowResizeState'
import { collapseGroupMap } from '@/store/settings'
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    contentScrollable?: boolean
  }>(),
  {
    contentScrollable: true,
  },
)

const showCollapse = computed({
  get() {
    return collapseGroupMap.value[props.name]
  },
  set(value) {
    collapseGroupMap.value[props.name] = value
  },
})

watch(showCollapse, (value) => {
  if (value) {
    showContent.value = true
  }
})

const showContent = ref(showCollapse.value)
const shouldRenderContent = computed(() => showContent.value && !isWindowResizing.value)

const handlerTransitionEnd = () => {
  if (!showCollapse.value) {
    showContent.value = false
  }
}
</script>
