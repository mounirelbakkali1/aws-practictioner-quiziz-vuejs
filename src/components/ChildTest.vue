<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div>
    <p>{{ user.language }}</p>
    <p>{{ user.theme }}</p>
  </div>
</template>
