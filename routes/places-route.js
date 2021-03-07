const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const placesControllers = require('../controllers/places-controller');

//[moved]
// const HttpError = require('../models/http-error'); 
//[moved]
// const DUMMY_PLACES = [
//     {
//         id:'p1',
//         title:'Empire State Building',
//         description:'One of the most famous sky scrapers in the world!',
//         location:{
//             lat:40.7484474,
//             lng:-73.9871516
//         },
//         address: '20 W 34th st, New York,Ny 10001',
//         creater:'u1'
//     }
// ];

// [moved to place-controller]
// router.get('/:pid',(req,res,next)=>{
//     const placeId = req.params.pid; // {pid: p1}
//     const place = DUMMY_PLACES.find( p => { //{place} => {place:place}
//         return p.id === placeId;
//     });

//     if(!place){
//         throw new HttpError('Could not find a place for the provided id.',404);
//         // const error = new Error('Could not find a place for the provided id.');
//         // error.code =404;
//         //  throw error; //use [throw] based on method => don't have to return bcz throw always return
//       }
 

//     res.json({place}); 
// });


//[moved to user-controller]
// router.get('/user/:uid', (req,res,next)=>{
//     const userId = req.params.uid;

//     const place = DUMMY_PLACES.find( p => {
//         return p.creater === userId;
//     })


//     // if we r in  synchronus method use [throw]
//     // if we r in asynchronus method use [next()]
//     if(!place){
//         return next(
//             new HttpError('Could not find a place for the provided user id.',404)
//         )
//     //    const error = new Error('Could not find a place for the provided user id.');
//     //    error.code =404;
//     //    return next(error); //use [throw] based on method => have to return bcz don't need to run next
//      }

//     res.json({place});
// });

// router.get('/:pid',);
// router.get('/user/:uid',)

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid',placesControllers.getPlacesByUserId)

router.post('/',
[check('title')
.not()
.isEmpty(),
check('description').isLength({min:5}),
check('address').not().isEmpty()],
placesControllers.createPlace);

router.patch('/:pid',
[check('title')
.not()
.isEmpty(),
check('description').isLength({min:5})],
placesControllers.updatePlace);

router.delete('/:pid',placesControllers.deletePlace);

module.exports = router;