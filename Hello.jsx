/** @jsx React.DOM */

'use strict'

var React = require('react')

const LETTERS = ['b', 'c', 'd', 'f', 'g']

module.exports = React.createClass({
  getRandomLetter () {
    return LETTERS[Math.floor(Math.random()*LETTERS.length)]
  },

  getInitialState () {
    return {
      queue: [],
      hits: 0,
      falseAlarms: 0,
      misses: 0,
      correctRejections: 0,
      letter: this.getRandomLetter(),
      nBack: 2
    }
  },

  next () {
    this.setState({
      queue: this.state.queue.concat(this.state.letter),
      letter: this.getRandomLetter()
    });
  },

  handleYes () {
    if (this.state.letter === this.state.queue[this.state.queue.length - this.state.nBack]) {
      this.setState({ hits: this.state.hits + 1 })
    } else {
      this.setState({ falseAlarms: this.state.falseAlarms + 1 })
    }
    this.next()
  },

  handleNo () {
    if (this.state.letter === this.state.queue[this.state.queue.length - this.state.nBack]) {
      this.setState({ misses: this.state.misses + 1 })
    } else {
      this.setState({ correctRejections: this.state.correctRejections + 1 })
    }
    this.next()
  },

  render: function () {
    return (
      <div>
        <h1>{this.state.letter}</h1>
        <button onClick={this.handleNo}>No</button>
        <button onClick={this.handleYes}>Yes</button>
        <div>Hits = {this.state.hits}</div>
        <div>False Alarms = {this.state.falseAlarms}</div>
        <div>Misses = {this.state.misses}</div>
        <div>Correct Rejections = {this.state.correctRejections}</div>
      </div>
    )
  }
})