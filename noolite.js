var HID = require('node-hid');

function nooLite(name) {
	this.devices = new HID.devices(0x16c0, 0x05df);
	this._init_command = [0x00, 0x50, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];	
	this._channels = 8;
	this._cmd = this._init_command
	this._connected = false;
	
	if (this.devices.length > 0) {
		device = this.devices[0];
		console.log('Manufacturer: ' + device.manufacturer + ' product: ' + device.product );
		this.dev = new HID.HID(device.path);
		this._connected = true;
	} else {
		console.log('No device found.');
	}
	
	this._set_ch = function(ch) {
        this.ch = ch
        if (this.ch >= this._channels || ch < 0) {
            console.log('Cant work with channel');
		}		
        this._cmd[5] = ch;
	}
	
	this._send = function() {
		if (this._connected) {
			console.log(this._cmd);
			this.dev.write(this._cmd)
		}
	}
	
	this.on = function(ch) {
		this._cmd = this._init_command;
		this._cmd[2] = 0x02;
		this._set_ch(ch);
		this._send();
	};

	this.off = function(ch) {
		this._cmd = this._init_command;
		this._cmd[2] = 0x00;
		this._set_ch(ch);
		this._send();
	};
	
	this.switch = function(ch) {
        this._cmd = this._init_command;
        this._cmd[2] = 0x04;
        this._set_ch(ch);
        this._send();
	}
	
	this.bind = function(ch) {
        this._cmd = this._init_command;
        this._cmd[2] = 0x0f;
        this._set_ch(ch);
        this._send();
	}
	
	this.unbind = function(ch) {
        this._cmd = this._init_command;
        this._cmd[2] = 0x09;
        this._set_ch(ch);
        this._send();
	}
};
