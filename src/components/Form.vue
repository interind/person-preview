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
    },
    childProfile: {
      id: 0,
      name: '',
      age: '',
    },
  }),
  methods: {
    addChild() {
      this.profile.children.push(this.childProfile);
      this.childProfile = { id: this.profile.children.length, name: '', age: ''};
      console.log(this.profile.children);
    },
    deleteItem(idKey) {
      this.profile.children = this.profile.children.filter(({id}) => id !== idKey);
    },
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
    statusList() {
      return this.profile.children.length;
    },
    getStatusButton() {
      console.log(Object.values(this.errors));
      return Object.values(this.errors).filter((el) => el).length;
    },
    statusShowAddButton() {
      return this.profile.children.length < 5;
    }
  }
};

</script>

<template>
  <form class="form" @submit.prevent="print(profile)">
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
      min=15
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
      <button
        v-show="statusShowAddButton"
        class="button button__add"
        @click="addChild"
        type="button"
      >
        <div />
        Добавить ребенка
      </button>
    </div>
    <transition-group v-show="statusList" name="list-complete" class="form__list" tag="ul">
      <li v-for="child in profile.children" :key="child.id" class="list-complete-item form__list-item">
        <InputMy
          id="name"
          nameInput="name"
          type="text"
          minlength=2
          classForm="form"
          :validator="checkInput"
          :msgError="errors.name"
          msgPlaceholder="Имя"
          :valueCheck="childProfile.name"
          v-model.capitalize="childProfile.name"
       />
      <InputMy
        id="age"
        nameInput="age"
        type="number"
        min=1
        max=80
        classForm="form"
        :validator="checkInput"
        :msgError="errors.age"
        msgPlaceholder="Возраст"
        v-model="childProfile.age"
        :valueCheck="childProfile.age"
      />
      <button
        class="button button__delete"
        @click="deleteItem(child.id)"
        type="button"
      >
        Удалить
      </button>
      </li>
    </transition-group>
    <button v-show="statusList" class="button button__submit" type="submit" :disabled="getStatusButton">
      Сохранить
    </button>
  </form>
</template>

