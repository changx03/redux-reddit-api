import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded, invalidateSubreddit, selectSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

/**
 * https://redux.js.org/advanced/example-reddit-api
 */

class AsyncApp extends Component {
  componentDidMount() {
    const { fetchPostsIfNeeded, selectedSubreddit } = this.props
    fetchPostsIfNeeded(selectedSubreddit)
  }

  componentDidUpdate(prevProps) {
    const { selectedSubreddit, fetchPostsIfNeeded } = this.props
    if (selectedSubreddit !== prevProps.selectedSubreddit) {
      fetchPostsIfNeeded(selectedSubreddit)
    }
  }

  handleChange = (nextSubreddit) => {
    const { selectSubreddit, fetchPostsIfNeeded } = this.props
    selectSubreddit(nextSubreddit)
    fetchPostsIfNeeded(nextSubreddit)
  }

  handleRefreshClick = (e) => {
    e.preventDefault()

    const { selectedSubreddit, invalidateSubreddit, fetchPostsIfNeeded } = this.props
    invalidateSubreddit(selectedSubreddit)
    fetchPostsIfNeeded(selectedSubreddit)
  }

  render() {
    return (
      <></>
    )
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  fetchPostsIfNeeded: PropTypes.func.isRequired,
  selectSubreddit: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const { isFetching, lastUpdated, items: posts } =  postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const { selectedSubreddit } = ownProps
  return {
    fetchPostsIfNeeded: (selectedSubreddit) => dispatch(fetchPostsIfNeeded(selectedSubreddit)),
    selectSubreddit: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)
