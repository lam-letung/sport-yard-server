import db from '../utils/db/index.js'

export const getProducts = async (req, res) => {
    try {
          const entries = await db
            .collection("products")
            .orderBy("timestamp", "desc")
            .get();
          const products = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
          }));
          res.status(200).json({ products });

      } catch (e) {
        res.status(400).end();
      }
}

export const getProductByID = async (req,res) => {
   const { id } = req.params
   const doc = await db.collection('products').doc(id).get()
   if (!doc.exists) {
    res.status(404).json({message : "Not found this Products"});
  } else {
    res.status(200).json({...doc.data(), id });
  }
}

export const getReviewsByProducts = async (req, res) => {
  try {
    const { id } = req.params
      const entries = await db
      .collection("products")
      .doc(id)
      .collection("reviews")
      .orderBy("timestamp", "desc")
      .get();
      const reviews = entries.docs.map((entry) => ({
      id: entry.id,
      ...entry.data(),
  }));
  res.status(200).json({ reviews });
    } catch (e) {
      res.status(400).end();
    }
}


export const createReviewByProduct = async (req, res) => {
  try {
    const { id } = req.params
    db.collection("products").doc(id).collection("reviews").add({
      ...req.body,
      timestamp: new Date().toISOString()
  })
  res.status(200).json({ reviews });
    } catch (e) {
      res.status(400).end();
    }
}


export const createProduct = async (req,res) => { 
    try {
        const { id } = await db.collection("products").add({
            ...req.body,
            timestamp: new Date().toISOString()
          });
          res.status(200).json({ id });
    }catch (err) {
        res.status(400).json({message : err})
    }
}

export const updateProductByID = async (req,res) => {
    try{
      const { id } = req.params
        const productUpdated = await db.collection('products').doc(id).update({
            ...req.body,
          });
          res.status(200).json({ productUpdated })
    }catch(err){
        res.status(400).json({message : err})
    }
}

export const deleteProductByID = async (req, res) => {
    try{
        const { id } = req.params
        await db.collection('products').doc(id).delete();
        res.status(200).json({ message : 'Products deleted successfully'})
    }catch(err){
        res.status(400).json({message : err})
    }
}