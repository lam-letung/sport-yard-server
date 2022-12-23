import db from '../utils/db/index.js'

export const getOrders = async (req, res) => {
    try {
          const entries = await db
            .collection("orders")
            .orderBy("timestamp", "desc")
            .get();
          const orders = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
          }));
          res.status(200).json({ orders });

      } catch (e) {
        res.status(400).end();
      }
}

export const getOrderByID = async (req,res) => {
   const { id } = req.params
   const doc = await db.collection('orders').doc(id).get()
   if (!doc.exists) {
    res.status(404).json({message : "Not found this order"});
  } else {
    res.status(200).json({...doc.data(), id });
  }
}

export const createOrder = async (req,res) => { 
    try {
        const { id } = await db.collection("orders").add({
            ...req.body,
            timestamp: new Date().toISOString()
          });
          res.status(200).json({ id });
    }catch (err) {
        res.status(400).json({message : err})
    }
}

export const updateOrderByID = async (req,res) => {
    try{
      const { id } = req.params
        const orderUpdated = await db.collection('orders').doc(id).update({
            ...req.body,
          });
          res.status(200).json({ orderUpdated })
    }catch(err){
        res.status(400).json({message : err})
    }
}

export const deleteOrderByID = async (req, res) => {
    try{
        const { id } = req.params
        await db.collection('orders').doc(id).delete();
        res.status(200).json({ message : 'Order deleted successfully'})
    }catch(err){
        res.status(400).json({message : err})
    }
}