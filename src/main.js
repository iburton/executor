/**
 * @overview Main application launch file, most initialization code is called from here
 * @author Ira Burton <ira.burton+gh@gmail.com>*
 */
import App from './App.svelte'
import Units from './stores/store_units'
import CurrentUserStore from './stores/store_current_user'

// Start Firestore -> Localstore synchronization subscriptions and store them for later teardown.
const subscriptions = []
subscriptions.push(Units.updater())
subscriptions.push(CurrentUserStore.updater())

const app = new App({ target: document.body, props: { currentRoute: '/' } })

export default app
