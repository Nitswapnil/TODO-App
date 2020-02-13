const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/Task');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req, res){
    Task.find({}, function(err, Task){
        if(err){
            console.log("error in fetching Task from db");
            return;
        }
        return res.render('home',{
            title: "TODO App",
            Task_list: Task
        });
    })
})

app.post('/create-Task', function(req, res){
    Task.create({
        description: req.body.description,
        category: req.body.category,
        due_date: req.body.due_date
    }, function(err, newTask){
        if(err){console.log('Error in creating a Task!')
            return;}
            console.log('******', newTask);
            return res.redirect('back');
    })
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

app.get('/delete-Task/', function(req, res){
    console.log(req.query);
    let id = req.query.id
    Task.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })
});
