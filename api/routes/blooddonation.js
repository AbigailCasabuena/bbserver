const express = require('express');
const router = express.Router();

const BloodDonation = require('../models/bloodDonationModel');

router.post("/",(req, res,next)=> {
    const bdonation = new BloodDonation({
        donor_id: req.body.donor_id,
        chapter: req.body.chapter,
        appointment_date: req.body.appointment_date,
        appointment_time: req.body.appointment_time,
        donor_name: req.body.donor_name,
        blood_group: req.body.blood_group,
        donation_type: req.body.donation_type,
        patient_directed_name: req.body.patient_directed_name
    });
    bdonation
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "blood donation saved" 
        })
    })
    .catch(err => {
        res.sendStatus(500);
        console.log(err.message);
    })
});

router.get('/:userId',(req, res,next)=>{
    const id = req.params.userId;
    BloodDonation.find({donor_id: id, status: 'completed'}).sort({date_completed:-1}) 
    .select('_id donor_id date_completed chapter blood_product_donated')
    .populate('chapter')
    .exec()
    .then(
        doc=>{
            if(doc != null){
                console.log(doc);
                res.status(200).send(doc);
            }else{
                res.status(404).json({
                    message: 'Not found.'
                })
            }
        },
        function (error){
            res.status(404).json({
                message: error.message
            })
            console.log('error');
        }
    )
    .catch();
});

router.get('/delprev/:userId',(req, res,next)=>{
    const id = req.params.userId;
    BloodDonation.find({donor_id: id, status: 'initial'})
    .select('_id donor_id date_completed chapter blood_product_donated')
    .populate('chapter')
    .exec()
    .then(
        doc=>{
            if(doc != null){
                //console.log(doc.length);
                //res.status(200).send(doc);
                if(doc.length > 0){
                    const id = doc[0]._id;
                    BloodDonation.remove({_id: id})
                    .exec()
                    .then(result => {
                        /*res.status(200).json({
                            message: 'Delete successful.'
                        });*/
                        console.log("delete successful");
                        //res.sendStatus(200);
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            message: err.message
                        })
                    });
                }
                res.sendStatus(200);
            }else{
                res.status(404).json({
                    message: 'Not found.'
                })
            }
        },
        function (error){
            res.status(404).json({
                message: error.message
            })
            console.log('error');
        }
    )
    .catch();
});

module.exports = router;