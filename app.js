const express = require('express')
const path = require('path')
const { v4 } = require('uuid')
const app = express()

let PROMO = [
	{ 
		id: v4(), 
		name: 'Акция1', 
		description: '123'
	},
	{ 
		id: v4(), 
		name: 'Акция2', 
		description: '234'
	},
	{ 
		id: v4(), 
		name: 'Акция3', 
		description: '345'
	},
]

let PRIZE = [
	{
		id: v4(),
		description: 'Телефон'
	}
]

let PARTICIPANTS = [
	{
		id: v4(),
		name: 'Данил'
	}
]

app.use(express.json())

// GET
app.get('/api/promo', (req, res) => {
	res.status(200).json(PROMO)
})

// POST
app.post('/api/promo', (req, res) => {
	const promo = { ...req.body, id: v4()}
	PROMO.push(promo)
	res.status(201).json(promo)
})

// DELETE
app.delete('/api/promo/:id', (req, res) => {
	PROMO = PROMO.filter(c => c.id !== req.params.id)
	res.status(200).json({ message: 'Акция была удалена' })
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(8080, () => console.log('Start'))
