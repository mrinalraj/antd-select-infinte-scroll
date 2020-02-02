function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { Select, Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
import './style.css';
export default class InfiniteScrollSelect extends Component {
  constructor() {
    super();

    _defineProperty(this, "state", {
      loading: false,
      data: []
    });

    _defineProperty(this, "onScroll", () => {
      const {
        data,
        loadMore,
        hasMore
      } = this.props;
      const lastElement = document.getElementById((data || []).length - 1);
      const containerTop = this.dropdown.current.getBoundingClientRect().top;
      const lastElementTopPos = lastElement.getBoundingClientRect().top - containerTop;
      const containerHeight = this.dropdown.current.getBoundingClientRect().height;

      if (lastElementTopPos - 15 < containerHeight && !this.state.loading && hasMore) {
        this.setState({
          loading: true
        });
        loadMore();
      }
    });

    this.dropdown = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        data: nextProps.data,
        loading: false
      };
    }

    return {};
  }

  render() {
    const {
      loadMore,
      ...restProps
    } = this.props;
    const {
      data,
      loading
    } = this.state;
    return React.createElement(Select, _extends({}, restProps, {
      onPopupScroll: this.onScroll,
      dropdownRender: menu => React.createElement("div", {
        ref: this.dropdown,
        id: "dropdown"
      }, menu, React.createElement("div", {
        class: "loader-loading-more"
      }, React.createElement(Spin, {
        indicator: React.createElement(Icon, {
          type: "loading",
          style: {
            fontSize: 20
          },
          spin: true
        }),
        spinning: loading
      })))
    }), data.map(({
      label,
      value
    }, index) => React.createElement(Select.Option, {
      id: index,
      key: value,
      value: value
    }, label)));
  }

}

_defineProperty(InfiniteScrollSelect, "propTypes", {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool
});
