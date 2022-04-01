<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getInfoUser', 'getStatusPreview']),
    list() {
     return this.getInfoUser.children.filter(({name, age}) => name && age);
    },
    user() {
     if(this.getInfoUser['name'] && this.getInfoUser['age']) {
       return this.getInfoUser
     } return false;
    },
  },
  methods: {
    ...mapActions(['actionUser']),
  },
  mounted() {
    this.actionUser();
  }
}
</script>


<template>
  <template v-if="user">
    <div class="preview">
      <h2 class="preview__title">{{user['name']}}, {{user['age']}} лет.</h2>
      <p class="preview__subtitle">
        Дети
      </p>
      <template v-if="list.length">
        <transition-group name="list-complete" class="preview__list" tag="ul">
          <li v-for="child in list" :key="child.id" class="list-complete-item preview__item">
            {{child['name']}}, {{child['age']}} лет.
          </li>
        </transition-group>
      </template>
      <template v-else>
        Список пуст
      </template>
    </div>
  </template>
  <template v-else>
    Пока ничего нет
  </template>
</template>