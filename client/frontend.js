import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'


new Vue({
	el: '#app',
	data() {
		return {
			loading: false,
			form: {
				name: '',
				description: ''
			},
			promos: []
		}
	},
	computed: {
		canCreate() {
			return this.form.name && this.form.description
		}
	},
	methods: {
		async createPromo() {
			const { ...promo } = this.form

			const newPromo = await request('/api/promo', 'POST', promo)

			this.promos.push(newPromo)

			this.form.name = this.form.description = ''
		},
		async removePromo(id) {
			await request(`/api/promo/${id}`, 'DELETE')
			this.promos = this.promos.filter(c => c.id !== id)
		}
	},
	async mounted() {
		this.promos = await request('/api/promo')
	}
})

async function request(url, method = 'GET', data = null) {
	try {
		const headers = {}
		let body

		if (data) {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(data)
		}

		const response = await fetch(url, {
			method,
			headers,
			body
		})
		return await response.json()
	} catch (e) {
		console.warn('Error:', e.message)
	}
}
