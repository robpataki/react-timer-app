var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jQuery');

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    expect(timer).toExist();
  });

  it('should start timer on `started` status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    timer.handleStatusChange('started');
    expect(timer.state.count).toBe(0);

    setTimeout(() => {
      expect(timer.state.timerStatus).toBe('started');
      expect(timer.state.count).toBe(1);
      done();
    }, 1001);
  });

  it('should pause the timer on `paused` status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    timer.setState({
      count: 3
    });
    timer.handleStatusChange('started');
    timer.handleStatusChange('paused');

    setTimeout(() => {
      expect(timer.state.timerStatus).toBe('paused');
      expect(timer.state.count).toBe(3);
      done();
    }, 1001);
  });

  it('should clear count on `stopped` status', (done) => {
    var timer = TestUtils.renderIntoDocument(<Timer />);
    timer.setState({
      count: 3
    });
    timer.handleStatusChange('started');
    timer.handleStatusChange('stopped');

    setTimeout(() => {
      expect(timer.state.timerStatus).toBe('stopped');
      expect(timer.state.count).toBe(0);
      done();
    }, 1001);
  });
});
