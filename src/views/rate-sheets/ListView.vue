<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <PageTitle title="Rate Sheet List" subtitle="View and manage all rate sheets.">
      <RouterLink to="/dashboard/rate-sheet/add" class="button-primary-outline"
        >Add New Rate Sheet</RouterLink
      >
    </PageTitle>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod perferendis iusto officia!
      Repudiandae necessitatibus animi, culpa delectus accusamus quis cum voluptatem dolorem,
      aperiam, voluptatibus mollitia!
    </p>
  </div>
</template>
