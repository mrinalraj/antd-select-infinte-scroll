export const getDataSet = pageNumber => {
	if (!pageNumber) throw new Error('page number not provided')
	let data = []
	for (let i = 10 * (pageNumber - 1) + 1; i < 10 * pageNumber; i++) {
		data.push({ label: i, value: i })
	}
	return data
}

export const getData = pageNumber => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const data = getDataSet(pageNumber)
			resolve(data)
		}, 1000)
	})
}
