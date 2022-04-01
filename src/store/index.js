import { createStore } from 'vuex';


export default createStore({
  state: localStorage.getItem('profile') ?
  JSON.parse(localStorage.getItem('profile')) : {
    name: '',
    age: '',
    children: [],
    statusShow: false,
  },
  mutations: {
    updateUserInfo(state, user) {
      state = {...state, ...user};
      localStorage.setItem('profile', JSON.stringify(this.state));
    },
    deleteItem(state, id) {
      state['children'] = state['children'].filter((el) => el.id !== id);
      localStorage.setItem('profile', JSON.stringify(this.state));
    }
  },
  actions: {
    actionUser(context, payload) {
      if (payload) {
        context.commit(
          'updateUserInfo',
          payload
        );
      } else {
        context.commit(
          'updateUserInfo',
          JSON.parse(localStorage.getItem('profile')));
      }
    },
    actionDeleteItem(context, payload) {
      context.commit('deleteItem', payload);
    }
  },
  getters: {
    getInfoUser(state) {
      return state;
    },
    getStatusPreview(state) {
      return state['statusShow'];
    },
  },
});
