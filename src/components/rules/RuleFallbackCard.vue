<template>
  <div
    v-if="rule"
    class="card"
  >
    <div class="flex flex-col gap-2 p-2 text-sm">
      <div class="flex flex-wrap items-center gap-2">
        <span class="font-medium">未命中规则缓存，将落到兜底规则</span>
      </div>

      <div class="flex min-h-6 flex-wrap items-center gap-1 md:gap-2">
        <span>{{ rule.type }}</span>
        <span
          v-if="rule.payload"
          class="text-main"
        >
          {{ rule.payload }}
        </span>
      </div>

      <div class="text-base-content/80 flex min-h-6 flex-wrap items-center gap-1 md:gap-2">
        <template
          v-for="(chain, chainIndex) in proxyChains"
          :key="`${rule.proxy}-${chain}`"
        >
          <ArrowRightCircleIcon
            v-if="chainIndex > 0"
            class="h-4 w-4"
          />
          <ProxyName
            :name="chain"
            class="badge gap-0 text-xs"
          />
        </template>
        <template v-if="shouldShowFinalNode">
          <ArrowRightCircleIcon class="h-4 w-4" />
          <ProxyName
            :name="getNowProxyNodeName(rule.proxy)"
            class="badge cursor-not-allowed gap-0 text-xs"
          />
        </template>
        <span
          v-if="latency !== NOT_CONNECTED && displayLatencyInRule"
          :class="latencyColor"
          class="ml-1 text-xs"
        >
          {{ latency }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NOT_CONNECTED } from '@/constant'
import { getColorForLatency } from '@/helper'
import { getLatencyByName, getNowProxyNodeName, getProxyGroupChains, proxyMap } from '@/store/proxies'
import { displayLatencyInRule, displayNowNodeInRule } from '@/store/settings'
import type { Rule } from '@/types'
import { ArrowRightCircleIcon } from '@heroicons/vue/24/solid'
import { computed } from 'vue'
import ProxyName from '../proxies/ProxyName.vue'

const props = defineProps<{
  rule: Rule | null
}>()

const proxyChains = computed(() => {
  if (!props.rule) {
    return []
  }

  return getProxyGroupChains(props.rule.proxy)
})

const latency = computed(() => {
  if (!props.rule) {
    return NOT_CONNECTED
  }

  return getLatencyByName(props.rule.proxy, props.rule.proxy)
})

const latencyColor = computed(() => getColorForLatency(Number(latency.value)))

const shouldShowFinalNode = computed(() => {
  if (!props.rule || !displayNowNodeInRule.value || !proxyMap.value[props.rule.proxy]?.now) {
    return false
  }

  const finalNodeName = getNowProxyNodeName(props.rule.proxy)
  return proxyChains.value[proxyChains.value.length - 1] !== finalNodeName
})
</script>
