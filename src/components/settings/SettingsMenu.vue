<template>
  <div
    ref="menuRef"
    class="settings-menu scrollbar-hidden ctrls-bar p-1 px-2"
    @touchstart.passive.stop
    @touchmove.passive.stop
    @touchend.passive.stop
  >
    <div class="flex w-full max-w-7xl flex-row">
      <div
        v-for="item in menuItems"
        :key="item.key"
        ref="menuItemRefs"
        :data-key="item.key"
        :id="`menu-item-${item.key}`"
        class="settings-menu-item mr-2 flex w-full flex-1 flex-shrink-0 cursor-pointer items-center justify-center gap-2 truncate px-4 py-2 transition-all duration-150"
        :class="[activeMenuKey === item.key ? 'settings-menu-item-active' : '']"
        @click="handleMenuClick(item.key)"
      >
        <component
          :is="item.icon"
          class="h-5 w-5"
        />
        <span class="hidden text-sm lg:block">
          {{ $t(item.label) }}
        </span>
      </div>
      <button
        class="btn btn-circle btn-sm my-auto"
        @click="showVisibilityDialog = true"
      >
        <Cog6ToothIcon class="h-4 w-4" />
      </button>
    </div>
    <SettingsVisibilityDialog v-model="showVisibilityDialog" />
  </div>
</template>

<script setup lang="ts">
import { useCtrlsBar } from '@/composables/useCtrlsBar'
import { SETTINGS_MENU_KEY } from '@/constant'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useSwipe } from '@vueuse/core'
import type { Component } from 'vue'
import { ref } from 'vue'
import SettingsVisibilityDialog from './SettingsVisibilityDialog.vue'

type MenuItem = {
  key: SETTINGS_MENU_KEY
  label: string
  icon: Component
  component: Component
}

const props = defineProps<{
  menuItems: MenuItem[]
  activeMenuKey: SETTINGS_MENU_KEY
}>()

const emit = defineEmits<{
  (e: 'menu-click', key: SETTINGS_MENU_KEY): void
}>()

const showVisibilityDialog = ref(false)

const menuRef = ref<HTMLDivElement>()
const menuItemRefs = ref<HTMLLIElement[]>([])

useCtrlsBar()

const { isSwiping } = useSwipe(menuRef, {
  passive: false,
  onSwipe(e: TouchEvent) {
    if (!menuRef.value) return
    const menuRect = menuRef.value.getBoundingClientRect()
    const targetKey = getMenuItemAtPosition(e.touches[0].clientX)
    if (targetKey && targetKey !== props.activeMenuKey) {
      emit('menu-click', targetKey)
    }
  },
})

const handleMenuClick = (key: SETTINGS_MENU_KEY) => {
  if (isSwiping.value) return
  emit('menu-click', key)
}

const getMenuItemAtPosition = (x: number): SETTINGS_MENU_KEY | null => {
  if (!menuRef.value) return null

  const menuRect = menuRef.value.getBoundingClientRect()
  const relativeX = x - menuRect.left

  // 找到触摸位置对应的菜单项
  for (const itemEl of menuItemRefs.value) {
    const itemRect = itemEl.getBoundingClientRect()
    const itemRelativeX = itemRect.left - menuRect.left
    const itemWidth = itemRect.width

    if (relativeX >= itemRelativeX && relativeX <= itemRelativeX + itemWidth) {
      return itemEl.dataset.key as SETTINGS_MENU_KEY
    }
  }

  return null
}
</script>
