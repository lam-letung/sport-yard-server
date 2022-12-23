import db from '../utils/db/index.js'

export const getUsers = async (req, res) => {
    try {
          const entries = await db
            .collection("users")
            .orderBy("timestamp", "asc")
            .get();
          const users = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
          }));
          res.status(200).json({ users });

      } catch (e) {
        res.status(400).end();
      }
}

export const getUserByID = async (req,res) => {
   const { id } = req.params
   const doc = await db.collection('users').doc(id).get()
   if (!doc.exists) {
    res.status(404).json({message : "Not found this user"});
  } else {
    res.status(200).json({...doc.data(), id });
  }
}

export const createUser = async (req,res) => { 
    try {
        const { id } = await db.collection("users").add({
            ...req.body,
            timestamp: new Date().toISOString()
          });
          res.status(200).json({ id });
    }catch (err) {
        res.status(400).json({message : err})
    }
}

export const updateUserByID = async (req,res) => {
    try{
      const { id } = req.params
        const userUpdated = await db.collection('users').doc(id).update({
            ...req.body,
          });
          res.status(200).json({ userUpdated })
    }catch(err){
        res.status(400).json({message : err})
    }
}

export const deleteUserByID = async (req, res) => {
    try{
        const { id } = req.params
        await db.collection('users').doc(id).delete();
        res.status(200).json({ message : 'User deleted successfully'})
    }catch(err){
        res.status(400).json({message : err})
    }
}