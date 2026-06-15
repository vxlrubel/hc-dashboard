<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <PageTitle title="Add Schedule" subtitle="Create a new schedule.">
      <RouterLink to="/dashboard/schedules" class="button-primary-outline"
        >All Schedules</RouterLink
      >
    </PageTitle>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod perferendis iusto officia!
      Repudiandae necessitatibus animi, culpa delectus accusamus quis cum voluptatem dolorem,
      aperiam, voluptatibus mollitia!
    </p>
  </div>
</template>
