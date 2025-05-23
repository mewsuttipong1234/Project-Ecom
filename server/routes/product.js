const express = require('express')
const router = express.Router()
const {create , list,listby,remove,searchFilters,update,read,
    creatImages,removeImage
} = require('../controllers/product')
//End point localhost:5000/api/product
const {authCheck,adminCheck} =require('../middlewares/authCheck')


router.post('/product',create)
router.get('/products/:count',list)
router.get('/product/:id',read)
router.put('/product/:id',update)
router.delete('/product/:id',remove)
router.post('/productby',listby)
router.post('/search/filters',searchFilters)

router.post('/images',authCheck,adminCheck,creatImages)
router.post('/removeimages',authCheck,adminCheck,removeImage)


module.exports = router