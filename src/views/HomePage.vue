<template>
  <div class="home-page">
    <img alt="Vue logo" src="../assets/logo.png">
    <Form msg={}/>
  </div>
</template>

<script>

import Form from '@/components/Form';

export default {
  name: 'HomePage',
  components: {
    Form,
  },
};

</script>
