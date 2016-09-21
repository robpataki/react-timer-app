var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
	getInitialState: function() {
		return {
			count: 0,
			countdownStatus: 'stopped'
		};
	},

	componentWillUnmount: function() {
		this.resetTimer();
	},

	componentDidUpdate: function(prevProps, prevState) {
		if (this.state.countdownStatus !== prevState.countdownStatus) {
			switch (this.state.countdownStatus) {
				case 'started':
					this.startTimer();
					break;
				case 'stopped':
					this.setState({
						count: 0
					});
				case 'paused':
					this.resetTimer();
				break;
			}
		}
	},

	startTimer: function() {
		this.timer = setInterval(() => {
			var oldCount = this.state.count;
			var newCount = this.state.count - 1;

			this.setState({
				count: newCount
			});

			if(newCount === 0) {
				this.setState({
					countdownStatus: 'stopped'
				});
				this.resetTimer();
			}
		}, 1000);
	},

	resetTimer: function() {
		clearInterval(this.timer);
		this.timer = undefined;
	},

	handleSetCountdown: function(seconds) {
		this.setState({
			count: seconds,
			countdownStatus: 'started'
		});
	},

	handleStatusChange: function(newStatus) {
		this.setState({
			countdownStatus: newStatus
		});
	},

	render: function () {
		var {count, countdownStatus} = this.state;
		var renderControlArea = () => {
			if(countdownStatus !== 'stopped') {
				return <Controls onStatusChange={this.handleStatusChange} countdownStatus={countdownStatus}/>;
			} else {
				return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
			}
		}
		return (
			<div>
				<h1 className="page-title">Countdown App</h1>
				<Clock totalSeconds={count}/>
				{renderControlArea()}
			</div>
		)
	}
});

module.exports = Countdown;
