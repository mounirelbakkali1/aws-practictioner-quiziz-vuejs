<script>
import ChildTest from './ChildTest.vue'

export default {
  data() {
    return {
      userDetails: {
        name: 'mounir elaouadi',
        email: 'mounir@gmail.com',
        password: '9201@ezouaoui',
        preferences: {
          language: 'fr',
          theme: 'dark'
        }
      }
    }
  },
  computed: {
    redefineUserDetails() {
      return this.userDetails.preferences
    }
  },
  components: { ChildTest }
}
</script>

<template>
  <!-- in this case we are passing the referece of the computed property to the child component-->
  <ChildTest :user="redefineUserDetails" />
</template>

<style></style>
