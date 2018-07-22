const express = require('express');

const app = express();


app.listen(8000, () => {
    console.log('Server started!');
});

//app.route('/api/books').get((req, res) => {
//    res.send([{ name: 'lilly' }, { name: 'lucy' }]);
//});

app.use(express.static('public'))