const express = require('express');
const app = new  express()
const fs = require('fs') 
const data = require('./data.json'); // data file 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//-----------GET-------------

app.get('/data',(req,res) =>{
    res.send(data)
    console.log('data read')
})



//-----POST------

app.post('/data',(req, res) =>{
    data.push(req.body)
    fs.writeFile('data.json', JSON.stringify(data),(err,resp) =>{
        if (err) {
            res.send('Data post failed')
        }
        else {
            console.log('data inserted : ', req.body)
            res.send('Data inserted Successfully')
        }
    })
});


//-----PUT-------

app.put('/data/:name', (req, res) =>{
    let name = req.params.name
    data.forEach((item) => {
        if(item.name == name) {
            item.name = req.body.name
            item.location = req.body.location
            item.patient_count = req.body.patient_count
            data.save(item)
        }
    })
   
    fs.writeFile("data.json", JSON.stringify(data), (err) =>{
        if(err){
            res.send("Data Update failed")
        }
        else{
        console.log('data updated : ',req.body)
        res.send('Data Updated Successfully')  
        }
    })

})




//------Delete------

app.delete('/data/:name', (req, res) =>{
    let {name} = req.params;
    let item = data.filter(item => item.name !== name)
    fs.writeFile('data.json', JSON.stringify(item),(err) =>{
        if(err) {
            res.send("Data cannot be deleted")
        }
        else{
            res.send("Data Deleted Successfully");
            console.log(`Data Deleted with name : ${name}`)
        }
    })
})
 

//port number
const PORT = 3000

// server initialization

app.listen(3000, () => {
    console.log(`Server is Running on port ${PORT}`);
})