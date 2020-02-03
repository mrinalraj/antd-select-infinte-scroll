# antd-select-infinte-scroll

> Infinite scrolling ant design select component

[![NPM](https://img.shields.io/npm/v/antd-select-infinte-scroll.svg)](https://www.npmjs.com/package/antd-select-infinte-scroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save antd-select-infinte-scroll
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'antd-select-infinte-scroll'

class Example extends Component {
	render() {
		return <InfiniteScrollSelect style={{ width: '400px' }} data={data} hasMore={page > 5 ? false : true} loadMore={this.getMoreData} />
	}
}
```

# props

| name         | type               | required | default | description                                                                         |
| ------------ | ------------------ | -------- | ------- | ----------------------------------------------------------------------------------- |
| **data**     | array (of objects) | true     | []      | array of dropdown data, each element must be object with properties `{label,value}` |
| **hasMore**  | boolean            | false    | false   | if true data loaded on scroll                                                       |
| **loadMore** | function           | true     | null    | function to get next data, please manage page number in this function               |

## License

MIT © [mrinalraj](https://github.com/mrinalraj)
