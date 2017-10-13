/**
 * http://usejsdoc.org/
 */

var pg = require('pg');
var connectionString = "postgres://postgres:welcome@localhost:5432/EMP_MASTER";

function query(sql, values, cb) {
	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			throw err;
		}
		client.query(sql, values, function(err, result) {
			done();
			cb(err, result);
		});
	});
}

exports.getAllEmployees = function(req, res, next) {
	query("select * from EMP_DTL", {}, function(err, result) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			status : 'success',
			data : result.rows,
			message : 'RetrievedALLEmployees'
		});
	});
};

// get all grades from EMP_DTL table 
exports.getAllGrades = function(req, res, next) {
	query("select distinct grade from EMP_DTL", {}, function(err, result) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			//status : 'success',
			data : result.rows,
			//message : 'RetrievedALLGrades'
		});
	});
};

//get all grades from EMP_DTL table 
exports.getSelectedGradeEmployee = function(req, res, next) {
	query("select * from EMP_DTL where grade=$1", [req.params.grade], function(err, result) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			status : 'success',
			data : result.rows,
			message : 'RetrievedSelectedGrades'
		});	
		var data = result.rows;
		console.log(data);
	});
};

exports.updateEmployee = function(req, res, next) {
	console.log(req);
	query("update EMP_DTL set email=$1 where ID=$2", [ req.query.email,req.params.id ], function(err, result) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			status : 'success',
			message : 'Updated Employee'
		});
	});
};

exports.deleteEmployee = function(req, res, next) {
	console.log(req);
	query("delete from EMP_DTL where grade=null", function(err, result) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			status : 'success',
			message : 'Deleted Employee'
		});
	});
};

exports.addEmployee = function(req, res, next) {
	console.log(req);
	query("Insert into emp_dtl (name,email,grade) values ($1,$2,$3)",[ req.body.name, req.body.email,req.body.grade], function(err, result) {
		if (err) {
			return next(err);
		}
		res.status(200).json({
			status : 'success',
			message : 'Inserted Employee'
		});
	});
};