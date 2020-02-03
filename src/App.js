import React, { Component } from 'react'
import InfiniteScrollSelect from './lib/InfiniteScrollSelect'
import { getData } from './generateData'

export default class App extends Component {
	state = {
		data: [],
		page: 1,
	}

	componentDidMount() {
		this.getMoreData()
	}

	setloading = () => this.setState({ loadingData: true })

	getMoreData = async _ => {
		const data = await getData(this.state.page)
		this.setState(prevState => ({
			data: [...prevState.data, ...data],
			page: prevState.page + 1,
		}))
	}

	render() {
		const { data, page } = this.state
		return <InfiniteScrollSelect style={{ width: '400px' }} data={data} hasMore={page > 5 ? false : true} loadMore={this.getMoreData} />
	}
}
