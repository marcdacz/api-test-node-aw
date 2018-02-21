describe('Swift Payment Method Tests', () => {
	describe('Validate Bank Country Code: US', () => {
		it('With Valid Details', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "US",
				account_name: "John Smith",
				account_number: randomstring.generate(16),
				swift_code: "ICBCUSBJ",
				aba: randomstring.generate(9)
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.be.eql('Bank details saved');
					done();
				});
		});
	
		it('With Missing SWIFT Code', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "US",
				account_name: "John Smith",
				account_number: randomstring.generate(2),
				aba: randomstring.generate(9)
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.be.eql(`'swift_code' is required when payment method is 'SWIFT'`);
					done();
				});
		});

		it('With Invalid SWIFT Code', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "US",
				account_name: "John Smith",
				account_number: randomstring.generate(2),
				aba: randomstring.generate(9),
				swift_code: "ICBCAUBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.be.eql(`The swift code is not valid for the given bank country code: US`);
					done();
				});
		});

		
		it('With Invalid Account Number Length', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "US",
				account_name: "John Smith",
				account_number: randomstring.generate(18),
				aba: randomstring.generate(9),
				swift_code: "ICBCUSBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					res.body.error.should.be.eql(`Length of account_number should be between 7 and 11 when bank_country_code is 'US'`);
					done();
				});
		});
	
		xit('With Missing ABA @Bug01', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "US",
				account_name: "John Smith",
				account_number: randomstring.generate(12),
				swift_code: "ICBCUSBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					done();
				});
		});
	
		it('With Invalid ABA Length', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "US",
				account_name: "John Smith",
				account_number: randomstring.generate(12),
				aba: randomstring.generate(10),
				swift_code: "ICBCUSBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					res.body.error.should.be.eql(`Length of 'aba' should be 9`);
					done();
				});
		});
	});

	describe('Validate Bank Country Code: AU', () => {
		it('With Valid Details', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "AU",
				account_name: "John Smith",
				account_number: randomstring.generate(7),
				swift_code: "ICBCAUBJ",
				bsb: randomstring.generate(6)
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.be.eql('Bank details saved');
					done();
				});
		});
	
		it('With Missing SWIFT Code', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "AU",
				account_name: "John Smith",
				account_number: randomstring.generate(8),
				bsb: randomstring.generate(6)
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.be.eql(`'swift_code' is required when payment method is 'SWIFT'`);
					done();
				});
		});

		it('With Invalid SWIFT Code', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "AU",
				account_name: "John Smith",
				account_number: randomstring.generate(9),
				bsb: randomstring.generate(6),
				swift_code: "ICBCCNBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.be.eql(`The swift code is not valid for the given bank country code: AU`);
					done();
				});
		});

		
		xit('With Invalid Account Number Length @Bug02', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "AU",
				account_name: "John Smith",
				account_number: randomstring.generate(10),
				bsb: randomstring.generate(6),
				swift_code: "ICBCAUBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					res.body.error.should.be.eql(`Length of account_number should be between 6 and 9 when bank_country_code is 'AU'`);
					done();
				});
		});
	
		it('With Missing BSB', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "AU",
				account_name: "John Smith",
				account_number: randomstring.generate(7),
				swift_code: "ICBCAUBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					res.body.error.should.be.eql(`'bsb' is required when bank country code is 'AU'`);
					done();
				});
		});
	
		it('With Invalid BSB Length', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "AU",
				account_name: "John Smith",
				account_number: randomstring.generate(9),
				bsb: randomstring.generate(10),
				swift_code: "ICBCAUBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					res.body.error.should.be.eql(`Length of 'bsb' should be 6`);
					done();
				});
		});
	});

	describe('Validate Bank Country Code: CN', () => {
		xit('With Valid Details @Bug04', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "CN",
				account_name: "John Smith",
				account_number: randomstring.generate(19),
				swift_code: "ICBCCNBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.be.eql('Bank details saved');
					done();
				});
		});
	
		it('With Missing SWIFT Code', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "CN",
				account_name: "John Smith",
				account_number: randomstring.generate(8)
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.be.eql(`'swift_code' is required when payment method is 'SWIFT'`);
					done();
				});
		});

		it('With Invalid SWIFT Code', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "CN",
				account_name: "John Smith",
				account_number: randomstring.generate(9),
				swift_code: "ICBCUSBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.error.should.be.eql(`The swift code is not valid for the given bank country code: CN`);
					done();
				});
		});

		
		xit('With Invalid Account Number Length @Bug02', (done) => {
			let data = {
				payment_method: "SWIFT",
				bank_country_code: "CN",
				account_name: "John Smith",
				account_number: randomstring.generate(10),
				swift_code: "ICBCAUBJ"
			};
	
			chai.request(server)
				.post(`/bank`)
				.send(data)
				.end((err, res) => {				
					res.should.have.status(400);
					res.body.error.should.be.eql(`Length of account_number should be between 6 and 9 when bank_country_code is 'AU'`);
					done();
				});
		});
	});	

	it('Validate Empty Account Name', (done) => {
		let data = {
			payment_method: "SWIFT",
			bank_country_code: "CN",
			account_name: "",
			account_number: randomstring.generate(8),
			swift_code: "ICBCUSBJ",
		};

		chai.request(server)
			.post(`/bank`)
			.send(data)
			.end((err, res) => {				
				res.should.have.status(400);
				res.body.error.should.be.eql(`'account_name' is required`);
				done();
			});
	});

	it('Validate Empty Account Number', (done) => {
		let data = {
			payment_method: "SWIFT",
			bank_country_code: "AU",
			account_name: "John Smith",
			account_number: "",
			swift_code: "ICBCAUBJ",
			bsb: randomstring.generate(6)
		};

		chai.request(server)
			.post(`/bank`)
			.send(data)
			.end((err, res) => {				
				res.should.have.status(400);
				res.body.error.should.be.eql(`'account_number' is required`);
				done();
			});
	});

	it('Validate Invalid Bank Country Code', (done) => {
		let data = {
			payment_method: "SWIFT",
			bank_country_code: "PH",
			account_name: "John Smith",
			swift_code: "ICBCPHBJ",
			account_number: randomstring.generate(8)
		};

		chai.request(server)
			.post(`/bank`)
			.send(data)
			.end((err, res) => {				
				res.should.have.status(400);
				res.body.error.should.be.eql(`'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'`);
				done();
			});
	});
});