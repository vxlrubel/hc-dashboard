<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <PageTitle title="Add Invoice" subtitle="Create a new invoice.">
      <RouterLink to="/dashboard/invoices" class="button-primary-outline"
        >All Invoices</RouterLink
      >
    </PageTitle>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod perferendis iusto officia!
      Repudiandae necessitatibus animi, culpa delectus accusamus quis cum voluptatem dolorem,
      aperiam, voluptatibus mollitia!
    </p>
  </div>
</template>
