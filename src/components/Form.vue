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
  <form class="form">
    <h1 class="form__title">
      Персональные данные
    </h1>
    <InputMy
      id="name"
      nameInput="name"
      type="text"
      minlength=2
      classForm="form"
      :validator="checkInput"
      :msgError="errors.name"
      msgPlaceholder="Имя"
      :valueCheck="profile.name"
      v-model.capitalize="profile.name"
    />
    <InputMy
      id="age"
      nameInput="age"
      type="number"
      min=1
      max=99
      classForm="form"
      :validator="checkInput"
      :msgError="errors.age"
      msgPlaceholder="Возраст"
      v-model="profile.age"
      :valueCheck="profile.age"
    />
    <div class="form__info">
      <h2 class="form__title">
        Дети (макс.5)
      </h2>
      <button class="button button__add" @click="print(profile)" type="button" :disabled="getStatusButton">
        Добавить ребенка
      </button>
    </div>
  </form>
</template>

