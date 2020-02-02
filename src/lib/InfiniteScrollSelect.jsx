import React, { Component } from 'react'
import { Select, Spin, Icon } from 'antd'
import PropTypes from 'prop-types'
import './style.css'

export default class InfiniteScrollSelect extends Component {
	constructor() {
		super()
		this.dropdown = React.createRef()
	}

	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.string).isRequired,
		loadMore: PropTypes.func.isRequired,
		hasMore: PropTypes.bool,
	}

	state = { loading: false, data: [] }

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.data !== prevState.data) {
			return { data: nextProps.data, loading: false }
		}
		return {}
	}

	onScroll = () => {
		const { data, loadMore, hasMore } = this.props
		const lastElement = document.getElementById((data || []).length - 1)
		const containerTop = this.dropdown.current.getBoundingClientRect().top
		const lastElementTopPos = lastElement.getBoundingClientRect().top - containerTop
		const containerHeight = this.dropdown.current.getBoundingClientRect().height

		if (lastElementTopPos - 15 < containerHeight && !this.state.loading && hasMore) {
			this.setState({ loading: true })
			loadMore()
		}
	}

	render() {
		const { loadMore, ...restProps } = this.props
		const { data, loading } = this.state
		return (
			<Select
				{...restProps}
				onPopupScroll={this.onScroll}
				dropdownRender={menu => (
					<div ref={this.dropdown} id='dropdown'>
						{menu}
						<div class='loader-loading-more'>
							<Spin indicator={<Icon type='loading' style={{ fontSize: 20 }} spin />} spinning={loading} />
						</div>
					</div>
				)}
			>
				{data.map(({ label, value }, index) => (
					<Select.Option id={index} key={value} value={value}>
						{label}
					</Select.Option>
				))}
			</Select>
		)
	}
}
