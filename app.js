/**
 * Module dependencies.
 */

var express = require('express'),
http = require('http');
var model = require('./queries');

var app = express();
app.use(express.bodyParser());
app.set('port', process.env.PORT || 5000);
app.use(app.router);
app.use(function(err,req,res,next){
	res.status(err.status || 500)
	.json({
		status:'error',
		message :err.message
	});
});

app.get('/api/employees', model.getAllEmployees);
app.get('/api/employees/grade', model.getAllGrades);
app.get('/api/employees/grade/:grade', model.getSelectedGradeEmployee);
app.put('/api/employees/:id',model.updateEmployee);
app.delete('/api/employees/:grade',model.deleteEmployee);
app.post('/api/employees',model.addEmployee);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
