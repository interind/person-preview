<script>

import Form from '@/components/Form';

export default {
  name: 'HomePage',
  components: {
    Form,
  },
  methods: {
    print(obj) {
      console.log(obj);
    },
  }
};

</script>

<template>
  <div class="content">
    <Form :print="print"/>
  </div>
</template>
