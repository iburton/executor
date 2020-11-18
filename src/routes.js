/**
 * @overview Definition of application routes
 * @author Ira Burton <ira.burton+gh@gmail.com>*
 */

import currentUser from './stores/store_current_user'
import MainApp from './components/layouts/mainApp.svelte'
import HomePage from './components/pages/home.svelte'
import LoginPage from './components/pages/login.svelte'
import LogoutPage from './components/pages/logout.svelte'

const loggedOut = () => currentUser.isLoggedOut()
// ISPRODUCTION here is replaced with a value from rollup.config.js at build time
const loggedIn = () => currentUser.isLoggedIn() || 'false' === 'ISPRODUCTION'

const loggedInGuard = { guard: loggedIn, redirect: 'login' }
const loggedOutGuard = { guard: loggedOut, redirect: 'home' }

const routes = [
  { name: '/', component: HomePage, layout: MainApp, onlyIf: loggedInGuard },
  { name: 'home', component: HomePage, layout: MainApp, onlyIf: loggedInGuard },
  { name: 'login', component: LoginPage, onlyIf: loggedOutGuard },
  { name: 'logout', component: LogoutPage },
  //  { name: 'signup', component: Signup, layout: MainApp, onlyIf: loggedOutGuard },
  //  { name: 'manageunits', component: UnitManager, layout: MainApp },
  //  { name: '404', component: NotFound, layout: MainApp },
]

export default routes
