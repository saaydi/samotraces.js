
var Samotraces = Samotraces || {};
Samotraces.Objects = Samotraces.Objects || {};

Samotraces.Objects.SelfUpdatingTimer = function(init_time,period,update_function) {
	// Addint the Observable trait
	Samotraces.Objects.Observable.call(this);
	this.time = init_time || 0;
	period = period || 2000;
	update_function = update_function || function() {return Date.now();};

	var timer = this;
	var update = function() {		
		timer.set(update_function(timer.time));
	};
	window.setInterval(update,period);
};

Samotraces.Objects.SelfUpdatingTimer.prototype = {
	set: function(time) {
		new_time = Number(time);
		if(this.time != new_time) {
			this.time = new_time;
			this.notify('updateTime',this.time);
		}
	}
};

// Timer is Observable
//Samotraces.Objects.Observable.call(Samotraces.Objects.SelfUpdatingTimer.prototype);