<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
</script>

<template>
  <div>
    <PageTitle title="Add Activity" subtitle="Create a new activity.">
      <!-- You can add action buttons or filters here using the default slot -->
      <RouterLink to="/dashboard/activities" class="button-primary-outline"
        >All Activities</RouterLink
      >
    </PageTitle>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod perferendis iusto officia!
      Repudiandae necessitatibus animi, culpa delectus accusamus quis cum voluptatem dolorem,
      aperiam, voluptatibus mollitia!
    </p>
  </div>
</template>
