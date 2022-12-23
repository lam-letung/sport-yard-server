import db from '../utils/db/index.js'

export const getTransactions = async (req, res) => {
    try {
          const entries = await db
            .collection("transactions")
            .TransactionBy("timestamp", "desc")
            .get();
          const transactions = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
          }));
          res.status(200).json({ transactions });

      } catch (e) {
        res.status(400).end();
      }
}

export const getTransactionByID = async (req,res) => {
   const { id } = req.params
   const doc = await db.collection('transactions').doc(id).get()
   if (!doc.exists) {
    res.status(404).json({message : "Not found this Transaction"});
  } else {
    res.status(200).json({...doc.data(), id });
  }
}

export const createTransaction = async (req,res) => { 
    try {
        const { id } = await db.collection("transactions").add({
            ...req.body,
            timestamp: new Date().toISOString()
          });
          res.status(200).json({ id });
    }catch (err) {
        res.status(400).json({message : err})
    }
}

export const updateTransactionByID = async (req,res) => {
    try{
      const { id } = req.params
        const transactionUpdated = await db.collection('transactions').doc(id).update({
            ...req.body,
          });
          res.status(200).json({ transactionUpdated })
    }catch(err){
        res.status(400).json({message : err})
    }
}

export const deleteTransactionByID = async (req, res) => {
    try{
        const { id } = req.params
        await db.collection('transactions').doc(id).delete();
        res.status(200).json({ message : 'Transaction deleted successfully'})
    }catch(err){
        res.status(400).json({message : err})
    }
}