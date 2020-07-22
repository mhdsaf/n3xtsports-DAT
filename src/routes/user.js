const express = require('express');

const clients = require('../models/client');

const axios = require('axios');

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
router.patch('/results', async(req,res)=>{
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
        checked: false
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
router.post('/userresults', async(req,res)=>{
    const email = req.body.email;
    try {
        const results = await clients.findOne({email:email});
        const length = results.results.length;
        res.status(200).send(results.results[length-1]);
    } catch (error) {
        res.status(400).send({error: "Email doesn't exist"});
    }
});
router.post('/profile', async(req,res)=>{
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
router.post('/adminProfile', async(req,res)=>{
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
router.get('/table', async (req, res)=>{
    res.render('table');
});
router.get('/admin', async (req, res)=>{
    res.render('admin');
});
router.get('/clients', async(req,res)=>{
    const Prom1 = await clients.find();
    res.status(200).send({data: Prom1});
});
router.get('/results', async(req,res)=>{
    const email = req.params.email;
    const num = req.params.num;
    res.render('clientResults');
});
router.patch('/pdf', async(req,res)=>{
    console.log(req.body.email);
    const Prom1 = await clients.findOne({email: req.body.email});
    Prom1.pdfCount = Prom1.pdfCount + 1;
    await Prom1.save();
});
router.post('/getCount', async(req,res)=>{
    const Prom1 = await clients.findOne({email: req.body.email});
    res.status(200).send({numb:Prom1.pdfCount});
})
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
            "tags" : ["digital assessment"],
            "title" : req.body.title,
            "details" : `Company Name: ${req.body.company}`
        },
        headers: {
            'Content-Type': 'application/json',
            'X-PW-AccessToken': 'd1feb764232104d575948c12943307b5',
            'X-PW-Application': 'developer_api',
            'X-PW-UserEmail': 'mgs35@mail.aub.edu '
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
                'X-PW-AccessToken': 'd1feb764232104d575948c12943307b5',
                'X-PW-Application': 'developer_api',
                'X-PW-UserEmail': 'mgs35@mail.aub.edu'
            }
          }).then(response=>{
              let id = response.data.id;
              let arr = [];
              let bool = false;
              arr = [...response.data.tags]
              //console.log("****************" + id + "   " + arr);
              arr.forEach(element => {
                  if(element=='digital assessment'){
                    bool = true;
                  }
              });
              if(bool==false){
                  arr.push('digital assessment');
                  //console.log(arr);
                  axios({
                    method: 'put', //you can set what request you want to be
                    url: `https://api.prosperworks.com/developer_api/v1/people/${id}`,
                    data: {"tags": arr},
                    headers: {
                        'Content-Type': 'application/json',
                        'X-PW-AccessToken': 'd1feb764232104d575948c12943307b5',
                        'X-PW-Application': 'developer_api',
                        'X-PW-UserEmail': 'mgs35@mail.aub.edu'
                    }
                  }).then(response=>{
                      console.log("OKAY");
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