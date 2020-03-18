function load (component) {
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`)
}

export default [{
  path: 'about',
  name: 'About',
  component: load('About')
},
{
  path: '',
  name: 'Home',
  component: load('Home')
}, {
  path: '*',
  name: '404',
  component: load('404')
}];
