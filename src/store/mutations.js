import { RECORD_ADDRESS } from './mutation-types.js'

export default {
	[RECORD_ADDRESS] (state, { latitude, longitude }) {
		state.latitude = latitude
		state.longitude = longitude
	}
}
