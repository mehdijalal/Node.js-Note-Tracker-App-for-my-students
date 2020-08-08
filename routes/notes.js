        var express = require('express');
        var fs = require('fs');
        var { json } = require('express');

        var router = express.Router();

        /* GET home page. */
        router.get('/', function(req, res, next) {
            var result;
            fs.readFile('db.json','utf8', function(err,data){
                if(err){
                    console.log(err);
          
                        throw err;
                    
                }else{
                   try{
                    if(data){
                        console.log(data);
                        var result = JSON.parse(data);
                        console.log('==================');
                        console.log(result);
                        res.render('notes', { title: 'Express', details: result });
                    }else{
                        result = [{"Id":111111111111,"Title":"Test","Description":"Test Description"}]
                        res.render('notes', { title: 'Express', details: result });
                    }
                   }catch(ex){
                       console.log(ex);
                   }
                }
                
            })
       
        });
        /* POST home page. */
        router.post('/', function(req, res, next) {

            console.log(req.body);
            var id = Math.floor((Math.random()*100)+10);

            var tital = req.body.title;
            var description = req.body.description;
            var mynotes = {"Id": id, "Title":tital, "Description": description};
            
            fs.readFile('db.json','utf8', function(err,data){
                var obj = JSON.parse(data);
                obj.push(mynotes);
                var strNotes = JSON.stringify(obj);
                fs.writeFile('db.json',strNotes, function(err){
                    if(err) return console.log(err);
                    console.log('Note added');
                });

            })
            

         

            var result;
            fs.readFile('db.json','utf8', function(err,data){
                try{
                    console.log(data);
                    var newdata = [data];
                    console.log(newdata);
                    var result = JSON.parse(data);
                    console.log('==================');
                    console.log(result);
                    res.render('notes', { title: 'Express', details: result });
                   }catch(ex){
                       console.log(ex);
                   }
            })
            
        });

        /* delete home page. */
        router.delete('/:id', function(req, res, next) {
            
            console.log('----delete-----');
            console.log(req.params);
            var id = req.params.id;

            console.log(id);

            fs.readFile('db.json','utf8', function(err,data){
                var obj = JSON.parse(data);
                console.log(obj);
                //----this is how you can get an object by id------//
                var foundItem = obj.find(o=>o.Id==id);
    

                var newObj = obj.filter(item=>item.Id!=id);
                console.log(newObj);

              
                var strNotes = JSON.stringify(newObj);
                fs.writeFile('db.json',strNotes, function(err){
                    if(err) return console.log(err);
                    console.log('Note added');
                });

            })
            
            
        });
    
        module.exports = router;
