import { createStore } from 'vuex'
import axios from 'axios';
import twitch from '@/utils/twitch'

const store = createStore({
 state() {
   return {
    auth: null,
    viewer: null,
    username: '',
    list: [],
   }
  },

  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    setUsername(state, user) {
      state.username = user.data.data[0].display_name;
    },
    setViewer(state, viewer) {
      state.viewer = viewer;
    },
    setList(state, list) {
      state.list = list.data;
    },
  },

  actions: {
    setAuth({ commit }, auth) {
      commit('setAuth', auth);
    },

    setViewer({ commit }) {
      commit('setViewer', twitch.viewer)
    },

    async fetchUserData(context) {
      try {
        const userData = await axios.get(`https://api.twitch.tv/helix/users?id=${context.state.viewer.id}`, {
          headers: {
            'Authorization': `Extension ${context.state.auth.helixToken}`,
            'Client-Id': 'uo78wv9pfkz6j9xtorkwb291wd1rm6'
          }
        })
        context.commit('setUsername', userData)
        return userData;
      } catch (e) {
        console.log('Failed API request to retieve user data from Twitch');
      }
    },

    async fetchList(context) {
      const list = await axios.get('https://twitch.narxx.com/queue.php', {
        params: {
          channelId: context.state.auth.channelId,
          username: context.state.username,
          command: 'list',
        }
      });
      context.commit('setList', list.data);
      return list
    },

    async joinQueue(context) {
      const resp = await axios.get('https://twitch.narxx.com/queue.php', {
        params: {
          channelId: context.state.auth.channelId,
          username: context.state.username,
          command: 'join',
        }
      })
      return resp;
    },

    async leaveQueue(context) {
      const resp = await axios.get('https://twitch.narxx.com/queue.php', {
        params: {
          channelId: context.state.auth.channelId,
          username: context.state.username,
          command: 'leave',
        }
      })
      return resp;
    }
  },
})
export default store
