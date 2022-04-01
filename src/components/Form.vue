<script>
import { mapActions, mapGetters } from 'vuex';
import InputMy from './InputMy.vue';

export default {
  name: 'Form',
  components: {InputMy},
  data: () => ({
    errors: {},
    profile: {},
    childProfile: {},
  }),
  methods: {
    addChild() {
      this.profile['children'].push(this.childProfile);
      this.childProfile = { id: this.profile['children']['length'], name: '', age: ''};
      this.errors = {status: true};
    },
    checkInput(prof) {
      if (!prof['name']) {
        this.errors['name'] = 'Укажите имя.';
      }
      if (prof['name']['length'] < 2) {
        this.errors['name'] = 'Слишком короткое имя.';
      }

      if (!prof['age']) {
        this.errors['age'] = 'Укажите возраст.';
      }
      if (!this.validAge(prof['age'])) {
        this.errors['age'] = 'Укажите настоящий возраст.';
      }
      else {
        this.errors = {};
        this.actionUser();
      }
    },
    validAge: function (num) {
      return +num > 0 && +num < 100;
    },
    profileSubmit() {
      this.profile['statusShow'] = true;
      this.actionUser(this.profile);
      this.$router.push('/preview');
    },
    ...mapActions(['actionUser', 'actionDeleteItem']),
    ...mapGetters(['getInfoUser']),
  },
  computed: {
    statusList() {
      return this.profile['children'] && this.profile['children']['length'];
    },
    getStatusButton() {
      return Object.values(this.errors).filter((el) => el).length;
    },
    statusShowAddButton() {
      return this.profile['children'] && this.profile['children']['length'] < 5 ;
    }
  },
  mounted() {
    this.profile = this.getInfoUser();
    this.checkInput(this.profile);
    this.childProfile = {
      id: this.profile['children'] ?
      this.profile.children.length
      : 0,
      name: '',
      age: '',
    };
  },
};

</script>

<template>
  <form class="form" novalidate @submit.prevent="profileSubmit">
    <InputMy
      id="name"
      nameInput="name"
      type="text"
      minlength=2
      classForm="form"
      :validator="checkInput.bind(null, profile)"
      :msgError="errors['name']"
      msgPlaceholder="Имя"
      :valueCheck="profile['name']"
      v-model.capitalize="profile['name']"
    />
    <InputMy
      id="age"
      nameInput="age"
      type="number"
      min=15
      max=99
      classForm="form"
      :validator="checkInput.bind(null, profile)"
      :msgError="errors['age']"
      msgPlaceholder="Возраст"
      v-model="profile['age']"
      :valueCheck="profile['age']"
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
      <li v-for="child, id in profile.children" :key="child.id" class="list-complete-item form__list-item">
        <InputMy
          id="name"
          nameInput="name"
          type="text"
          minlength=2
          classForm="form"
          :validator="checkInput.bind(null, profile.children[id])"
          :msgError="errors['name']"
          msgPlaceholder="Имя"
          v-model.capitalize="profile.children[id]['name']"
          :valueCheck="profile.children[id]['name']"
       />
      <InputMy
        id="age"
        nameInput="age"
        type="number"
        min=1
        max=80
        classForm="form"
        :validator="checkInput.bind(null, profile.children[id])"
        :msgError="errors['age']"
        msgPlaceholder="Возраст"
        v-model="profile.children[id]['age']"
        :valueCheck="profile.children[id]['age']"
      />
      <button
        class="button button__delete"
        @click="actionDeleteItem(child.id)"
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

