import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Articles from './views/Articles.vue'
import Hero from './views/Hero.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {path: '', name: 'home', component: Home},
        {path: 'articles/:id', name: 'articles', component: Articles, props: true}
      ]
    },
    {
      path: '/heroes/:id',
      name: 'heroes',
      component: Hero,
      props: true
    }
  ]
})
