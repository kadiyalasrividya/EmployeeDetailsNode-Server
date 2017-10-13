/**
 * http://usejsdoc.org/
 */
var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var server = require('./../app');

describe('Get/api/employees', function(){
	
	// get all employee
	it('should return employees from emp_dtl Table', function(){
		chai.request(server)
		.get('/api/employees')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('harini');
			done();
		});
	});
	
	// get one employee
	it('should return employees from emp_dtl Table', function(){
		chai.request(server)
		.get('/api/employees/2')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('harini');
			done();
		});
	});
	
	//updating employee
	it('should update employees from emp_dtl Table', function(){
		chai.request(server)
		.put('/api/employees/3?email=hari@gmail.com')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('success');
			done();
		});
	});
	
	//deleting employee
	it('should return employees from emp_dtl Table', function(){
		chai.request(server)
		.delete('/api/employees/2')
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('success');
			done();
		});
	});
	
	//inserting employee
	it('should add employees to emp_dtl Table', function(){
		chai.request(server)
		.post('/api/employees')
		.send({name : 'Srividya', email : 'srividya@gmail.com'})
		.end(function(err,res){
			res.status.should.equal(200);
			res.text.should.contain('success');
			done();
		});
	});
	
	//Error Handling
	it('should Handle errors', function(){
		chai.request(server)
		.post('/api/employees')
		.send({id:'1'})
		.end(function(err,res){
			res.status.should.equal(500);
			res.text.should.contain('error Message');
			done();
		});
	});
});
