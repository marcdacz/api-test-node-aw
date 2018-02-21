describe('Swift Payment Method Tests', () => {
	it('Validate US with Valid Details', (done) => {
		let data = {
			payment_method: "SWIFT",
			bank_country_code: "US",
			account_name: "John Smith",
			account_number: "123",
			swift_code: "ICBCUSBJ",
			aba: "11122233A"
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