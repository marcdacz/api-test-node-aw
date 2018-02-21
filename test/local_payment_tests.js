describe('Local Payment Method Tests', () => {	
	it('Validate US with Valid Details', (done) => {
		let data = {
			payment_method: "LOCAL",
			bank_country_code: "US",
			account_name: "John Smith",
			account_number: randomstring.generate(10),
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
});