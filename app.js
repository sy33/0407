

var express = require ('express');
var bodyParser = require ('body-parser');

var app = express();

app.use(express.static('public'));

app.use(bodyParser());

app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);


app.get('/' , (req,res)=>{
    res.render('index' , {});
})

app.get('/services', (req, res)=>{ /// API
    const data = {
        result:[
            {
                title: 'Database',
                content: 'This is ....'
            },
            {
                title: 'Storage',
                content: 'This is ....'               
            },
            {
                title: 'Hosting',
                content: 'This is ....'
            }
        ]
   }

   res.json(data)

})

app.listen(3000);


