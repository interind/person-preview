<template>
  <form class="form" name="profile">
    <label for="name" class="form__label">
      <input type="text" name="name" class="form__input">
    </label>
  </form>
</template>

<script>

export default {
  name: 'Form',
  props: {
    msg: Object,
  },
};

</script>