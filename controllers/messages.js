import db from '../utils/db/index.js'

export const getMessages = async (req, res) => {
    try {
          const entries = await db
            .collection("messages")
            .orderBy("timestamp", "asc")
            .get();
          const messages = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
          }));
          res.status(200).json({ messages });

      } catch (e) {
        res.status(400).end();
      }
}

export const getMessageByID = async (req,res) => {
   const { id } = req.params
   const doc = await db.collection('messages').doc(id).get()
   if (!doc.exists) {
    res.status(404).json({message : "Not found this Message"});
  } else {
    res.status(200).json({...doc.data(), id  });
  }
}

export const createMessage = async (req,res) => { 
    try {
        const { id } = await db.collection("messages").add({
            ...req.body,
            timestamp: new Date().toISOString()
          });
          res.status(200).json({ id });
    }catch (err) {
        res.status(400).json({message : err})
    }
}

export const updateMessageByID = async (req,res) => {
    try{
      const { id } = req.params
        const messageUpdated = await db.collection('messages').doc(id).update({
            ...req.body,
          });
          res.status(200).json({ messageUpdated })
    }catch(err){
        res.status(400).json({message : err})
    }
}

export const deleteMessageByID = async (req, res) => {
    try{
        const { id } = req.params
        await db.collection('messages').doc(id).delete();
        res.status(200).json({ message : 'Message deleted successfully'})
    }catch(err){
        res.status(400).json({message : err})
    }
}