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
    isLoading: false,
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
    setLoader(state, isLoading) {
      // console.log('mutating loader', isLoading);
      state.isLoading = isLoading;
    }
  },

  actions: {
    setAuth({ commit }, auth) {
      commit('setAuth', auth);
    },

    setViewer({ commit }) {
      if (twitch.viewer) {
        commit('setViewer', twitch.viewer)
      }
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
      try {
        const list = await axios.get('https://twitch.narxx.com/queue.php', {
          params: {
            channelId: context.state.auth.channelId,
            username: context.state.username,
            command: 'list',
          }
        });
        context.commit('setList', list.data);
        return list
      } catch(e) {
        console.log('Error fetching queue', e);
      }
    },

    async joinQueue(context) {
      try {
        return await axios.get('https://twitch.narxx.com/queue.php', {
          params: {
            channelId: context.state.auth.channelId,
            username: context.state.username,
            command: 'join',
          }
        })
      } catch (e) {
        console.log('Error joining queue', e);
      }
    },

    async leaveQueue(context) {
      try {
        return await axios.get('https://twitch.narxx.com/queue.php', {
          params: {
            channelId: context.state.auth.channelId,
            username: context.state.username,
            command: 'leave',
          }
        })
      } catch (e) {
        console.log('Error leaving queue', e);
      }
    },

    async promote(context, username) {
      try {
        const resp = await axios.get('https://twitch.narxx.com/queue.php', {
          params: {
            channelId: context.state.auth.channelId,
            username: username,
            command: 'up',
          }
        })
        await context.dispatch('fetchList');
        return resp;
      } catch(e) {
        console.log(`Error promoting ${username}`, e);
      }
    },

    async demote(context, username) {
      try {
        const resp = await axios.get('https://twitch.narxx.com/queue.php', {
          params: {
            channelId: context.state.auth.channelId,
            username: username,
            command: 'down',
          }
        })
        await context.dispatch('fetchList');
        return resp;
      } catch(e) {
        console.log(`Error demoting ${username}`, e);
      }
    },

    async removeFromQueue(context, username) {
      try {
        const resp = await axios.get('https://twitch.narxx.com/queue.php', {
          params: {
            channelId: context.state.auth.channelId,
            username: username,
            command: 'leave',
          }
        })
        await context.dispatch('fetchList');
        return resp;
      } catch(e) {
        console.log(`Error removing ${username}`, e);
      }
    },

    setLoader({ commit }, isLoading) {
      commit('setLoader', isLoading);
    },
  },
})
export default store
