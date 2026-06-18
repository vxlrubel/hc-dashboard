<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

defineProps<{
  total: number
  itemsPerPage?: number
}>()

const page = defineModel<number>('page', { default: 1 })
</script>

<template>
  <Pagination
    v-slot="{ page: currentPage }"
    v-model:page="page"
    :items-per-page="itemsPerPage ?? 10"
    :total="total"
  >
    <PaginationPrevious />
    <PaginationContent v-slot="{ items }">
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem
          v-if="item.type === 'page'"
          :value="item.value"
          :is-active="item.value === currentPage"
        >
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else />
      </template>
    </PaginationContent>
    <PaginationNext />
  </Pagination>
</template>
