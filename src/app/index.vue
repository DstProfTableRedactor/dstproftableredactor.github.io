<script setup lang="ts">
import { EditMode } from '~/shared/types/editmode';
import { Header } from '~/widgets/Header';

useHead({
  meta: [
    { name: 'google-site-verification', content: 'pi0rv86VBqXV4bksh6OcmwoG4XOsmyqQ7SPIMrBbHGs' },
  ],
})
</script>

<template>
  <Header/>
  <NuxtPage/>
  <Notification/>
</template>