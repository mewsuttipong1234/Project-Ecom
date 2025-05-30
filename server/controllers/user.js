const { json } = require("express")
const prisma = require("../config/prisma")


exports.listUser = async(req,res)=>{
    try{
        const user = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                role:true,
                enabled:true,
                address:true
            }
        })
        res.send(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}
exports.changeStatus = async(req,res)=>{
    try{
        const {id , enabled} = req.body
        const user = await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:{ enabled:enabled}
        })
        console.log(id,enabled)
        res.send('Update Status Success')
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}
exports.changeRole = async(req,res)=>{
    try{
        const {id , role} = req.body
        const user = await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:{ role:role}
        })
        console.log(id,role)
        res.send('Update Role success')
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}
exports.userCart = async(req,res)=>{
    try {
        const cart = req.body.cart;
        console.log(cart);
        console.log(req.user.id);

        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id) }
        });

        // Delete cart items
        await prisma.productOnCart.deleteMany({
            where: {
                cart: {
                    orderById: user.id
                }
            }
        });

        // Delete old cart
        await prisma.cart.deleteMany({
            where: {
                orderById: user.id
            }
        });

        // เตรียมสินค้า
        let products = cart.map((item)=>({
            productId: item.id,
            count: item.count ,
            price: item.price
        }))

        let cartTotal = products.reduce((sum,item)=>sum+item.price * item.count,0)
        
        const newCart = await prisma.cart.create({
            data:{
                products:{create:products},
                cartTotal:cartTotal,
                orderById:user.id
            }
        })
        
        
        
        console.log(newCart)

        res.send('Add cart ok');
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
    }
}
exports.getUserCart = async(req,res)=>{
    try{
        const cart = await prisma.cart.findFirst({
            where:{
                orderById: Number(req.user.id)

            },
            include:{
                products:{
                    include:{
                        product:true
                    }
                }
            }
        })
        // console.log(cart)
        res.json({
            products : cart.products,
            cartTotal : cart.cartTotal
        })
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}

exports.emtyCart = async(req,res)=>{
    try{
        const cart = await prisma.cart.findFirst({
            where:{
                orderById: Number(req.user.id)
            }
        })
        if(!cart){
            res.status(400).json({message:"No cart"})
        }
        await prisma.productOnCart.deleteMany({
            where:{
                cartId:cart.id
            }
        })
        const  result = await prisma.cart.deleteMany({
            where:{
                orderById: Number(req.user.id)
            }
        }) 
        res.json({message:"cart emty success" , 
            deletedCount: result.count
        })
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}

exports.saveAddress = async(req,res)=>{
    try{
        const {address} = req.body
        console.log(address)
        const addressUser = await prisma.user.update({
            where:{
                id: Number(req.user.id)

            },
            data:{
                address:address
            }
        })



        res.json({ok:true,message:"update success!"})
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}
exports.saveOrder = async(req,res)=>{
    try{
        //step 1 get user cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderById: Number(req.user.id)
              },include:{
                products:true
              }
        })

        //check cart empty
        if(!userCart || userCart.products.length === 0){
            return res.status(400).json({ok:false,message:'Cart in Empty'})
        }

        //check quantity
        for(const item of userCart.products){

           
            const product =await prisma.product.findUnique({
                where:{id:item.productId},
                select:{ quantity:true , title:true}
            })
            if(!product || item.count > product.quantity){
                return res.status(400).json({
                    ok:false,
                    message:`Sorry Product ${product?.title || 'product'} sold out`
                })
            }


            console.log('-->',item)
            console.log(product)
        }

        //step Create new order
        const order = await prisma.order.create({
            data:{
                products:{
                    create: userCart.products.map((item)=>({
                        productId:item.productId,
                        count:item.count,
                        price:item.price
                    }))
                },
                orderedBy:{
                    connect:{id:req.user.id}
                },
                cartTotal: userCart.cartTotal
                
            }
        })

        //update product
        const update = userCart.products.map((item)=>({
            where:{id: item.productId},
            data:{
                quantity:{decrement: item.count},
                sold:{increment: item.count}
            }
        }))
        console.log(update)

        await Promise.all(
            update.map((updated)=> prisma.product.update(updated))
        )

        await prisma.cart.deleteMany({
            where:{orderById : Number(req.user.id)}
        })

        res.json({ok:true , order})
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}
exports.getOrder = async(req,res)=>{
    try{
        const orders = await prisma.order.findMany({
            where:{ orderById:Number(req.user.id)},
            include:{ products:{
                include:{
                    product: true
                }
            }}
        })
        if(orders.length === 0){
            return res.status(400).json({ok:false , message:'No order'})
        }
        console.log(orders);
        res.json({ok:true , orders})
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'server error'})
    }
}

