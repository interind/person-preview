<script>
import InputMy from './InputMy.vue';

export default {
  name: 'Form',
  components: {InputMy},
  props: {
    print: Function,
  },
  data: () => ({
    errors: {name: '', age: '', status: 'true'},
    profile: {
      name: '',
      age: '',
      children: [],
    }
  }),
  methods: {
    checkInput: function () {
      this.errors = {name: '', age: ''};
      if (!this.profile['name']) {
        this.errors['name'] = 'Укажите имя.';
      }
      else if (this.profile['name'].length < 2) {
        this.errors['name'] = 'Слишком короткое имя.';
      }
      else {
        this.errors['name'] = '';
      }

      if (!this.profile['age']) {
        this.errors['age'] = 'Укажите возраст.';
      }
      else if (!this.validAge(this.profile['age'])) {
        this.errors['age'] = 'Укажите настоящий возраст.';
      }
      else {
        this.errors['age'] = '';
      }
    },
    validAge: function (num) {
      return num > 0 && num < 100;
    },
  },
  computed: {
    getStatusButton() {
      console.log(Object.values(this.errors));
      return Object.values(this.errors).filter((el) => el).length;
    },
  }
};

</script>

<template>
  <form class="form" novalidate="true">
    <InputMy
      nameInput="name"
      typeInput="text"
      classForm="form"
      :validator="checkInput"
      :msgError="errors.name"
      v-model.capitalize="profile.name"
    />
    <InputMy
      nameInput="age"
      typeInput="text"
      classForm="form"
      :validator="checkInput"
      :msgError="errors.age"
      v-model="profile.age"
    />
    </form>
    <div class="content__info">
      <button class="button button__add" @click="print(profile)" type="button" :disabled="getStatusButton">
        Добавить ребенка
      </button>
    </div>
</template>

