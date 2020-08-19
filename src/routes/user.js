const express = require('express');

const clients = require('../models/client');

const admin = require('../models/admin');

const axios = require('axios');

const authentication = require('../middleware/authentication');

const bcrypt = require('bcryptjs');

const router = new express.Router();

router.post('/user', async(req,res)=>{
    try {
        const user = new clients({name: req.body.name, email: req.body.email, title: req.body.title, company: req.body.company, Organization: req.body.organization, ContactAgreement: req.body.ContactAgreement});
        await user.save();
        res.status(200).send({success: "Successfully inserted"})
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Something went wrong"});
    }
})
router.get('/questionnaire', async(req,res)=>{
    res.render('questionnaire');
})
router.get('/dashboard', async(req,res)=>{
    res.render('dashboard');
});
router.post('/dashboard/print', async(req,res)=>{
})
router.patch('/results', authentication, async(req,res)=>{
    try {
    const user = await clients.findOne({email: req.body.email});
    const obj = {
        Business_Strategy: req.body.BS,
        Internal_Digitalization: req.body.ID,
        Digital_Products: req.body.DP,
        Data_Management: req.body.DM,
        Content_Production: req.body.CP,
        Total: req.body.BS + req.body.ID + req.body.DP + req.body.DM + req.body.CP,
        SubmittedAt: req.body.time,
        checked: false,
        pdfCount: 0
    };
    const obj1 = {
        test: req.body.questions
    }
    await user.results.push(obj);
    await user.questions.push(obj1);
    await user.save();
    res.send({msg:"all good"});
    } catch (error) {
        console.log("wtf");
        console.log(error);
    }
});
router.post('/userresults', authentication, async(req,res)=>{
    const email = req.body.email;
    try {
        const results = await clients.findOne({email:email});
        const length = results.results.length;
        res.status(200).send(results.results[length-1]);
    } catch (error) {
        res.status(400).send({error: "Email doesn't exist"});
    }
});
router.post('/profile', authentication, async(req,res)=>{
    const email = req.body.email;
    try {
        const results = await clients.findOne({email:email});
        res.status(200).send({
            name: results.name,
            email: results.email,
            title: results.title,
            company: results.company
        });
    } catch (error) {
        res.status(400).send({error: "Email doesn't exist"});
    }
});
router.post('/adminProfile', authentication, async(req,res)=>{
    const email = req.body.email;
    const n = req.body.index;
    try {
        const results = await clients.findOne({email:email});
        res.status(200).send({
            name: results.name,
            email: results.email,
            title: results.title,
            company: results.company,
            results: results.results[n],
            questions: results.questions[n]
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({error: "Email doesn't exist"});
    }
});
router.post('/table', async (req, res)=>{
    res.render('table');
});
router.get('/admin', async (req, res)=>{
    res.render('adminLogin');
});
router.post('/login', async (req,res)=>{
    const user = await admin.find({});
    const email  = req.body.email;
    const pass = req.body.pass;
    const matched = await bcrypt.compare(pass, user[0].password);
    if(email==user[0].email && matched==true){
        res.send({response: 'Success'});
    }else{
        res.send({response: 'Denied'});
    }
});
router.post('/home', async (req, res)=>{
    res.render('admin');
});
router.post('/clients', authentication, async(req,res)=>{ //this
    const Prom1 = await clients.find();
    res.status(200).send({data: Prom1});
});
router.post('/results', async(req,res)=>{ //this
    res.render('clientResults');
});
router.patch('/pdf', authentication, async(req,res)=>{
    const Prom1 = await clients.findOne({email: req.body.email});
    let arr = [...Prom1.results];
    const len = Prom1.results.length;
    let p2 = Object.assign({}, Prom1.results[len-1]);
    p2.pdfCount = p2.pdfCount + 1;
    arr[len-1] = p2;
    console.log(arr);
    Prom1.results = arr;
    await Prom1.save();
});
router.post('/getCount', async(req,res)=>{
    const Prom1 = await clients.findOne({email: req.body.email});
    const len = Prom1.results.length;
    const count = Prom1.results[len-1].pdfCount;
    res.status(200).send({numb:count});
});
router.post('/crm', async(req,res)=>{
    const email = req.body.email;
    axios({
        method: 'post', //you can set what request you want to be
        url: 'https://api.prosperworks.com/developer_api/v1/people',
        data: {
            "name":req.body.name,
            "emails": [
                {
                "email":email,
                "category":"work"
                }
            ],
            "tags" : ["digital assessment tool"],
            "title" : req.body.title,
            "details" : `Company Name: ${req.body.company}`,
            "assignee_id" : 357132,
            "contact_type_id": 898431
        },
        headers: {
            'Content-Type': 'application/json',
            'X-PW-AccessToken': process.env.token,
            'X-PW-Application': 'developer_api',
            'X-PW-UserEmail': process.env.email
        }
      }).then(response=>{
          //res.send(response.data)
      }).catch(error=>{
          //console.log(error);
          axios({
            method: 'post', //you can set what request you want to be
            url: 'https://api.prosperworks.com/developer_api/v1/people/fetch_by_email',
            data: {
                "email":email
            },
            headers: {
                'Content-Type': 'application/json',
                'X-PW-AccessToken': process.env.token,
                'X-PW-Application': 'developer_api',
                'X-PW-UserEmail': process.env.email
            }
          }).then(response=>{
              let id = response.data.id;
              let arr = [];
              let bool = false;
              arr = [...response.data.tags]
              arr.forEach(element => {
                  if(element=='digital assessment tool'){
                    bool = true;
                  }
              });
              if(bool==false){
                  arr.push('digital assessment tool');
                  //console.log(arr);
                  axios({
                    method: 'put', //you can set what request you want to be
                    url: `https://api.prosperworks.com/developer_api/v1/people/${id}`,
                    data: {"tags": arr},
                    headers: {
                        'Content-Type': 'application/json',
                        'X-PW-AccessToken': process.env.token,
                        'X-PW-Application': 'developer_api',
                        'X-PW-UserEmail': process.env.email
                    }
                  }).then(response=>{
                      res.send(response.data)
                  }).catch(error=>{
                    res.send(error);  
                    console.log(error)
                  });
              }
              //res.send(response.data)
          }).catch(error=>{
              //console.log('ok')
              //console.log(error);
          });
      });
})
module.exports = router