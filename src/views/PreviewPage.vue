<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getInfoUser', 'getStatusPreview']),
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
  <template v-if="getStatusPreview">
    <div class="preview">
      <h2 class="preview__title">{{getInfoUser['name']}}, {{getInfoUser['age']}} лет.</h2>
      <p class="preview__subtitle">
        Дети
      </p>
      <template v-if="getInfoUser.children.length">
        <transition-group name="list-complete" class="preview__list" tag="ul">
          <li v-for="child in getInfoUser.children" :key="child.id" class="list-complete-item preview__item">
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