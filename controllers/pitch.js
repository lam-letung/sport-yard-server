import db from '../utils/db/index.js'

export const getPitches = async (req, res) => {
    try {
          const entries = await db
            .collection("pitch")
            .orderBy("timestamp", "desc")
            .get();
          const pitch = entries.docs.map((entry) => ({
            id: entry.id,
            ...entry.data(),
          }));
          res.status(200).json({ pitch });

      } catch (e) {
        res.status(400).end();
      }
}

export const getPitchByID = async (req,res) => {
   const { id } = req.params
   const doc = await db.collection('pitch').doc(id).get()
   if (!doc.exists) {
    res.status(404).json({message : "Not found this pitch"});
  } else {
    res.status(200).json({...doc.data(), id });
  }
}

export const getReviewsByPitch = async (req, res) => {
  try {
    const { id } = req.params
      const entries = await db
      .collection("pitch")
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

export const createReviewByPitch = async (req, res) => {
  try {
    const { id } = req.params
    db.collection("pitch").doc(id).collection("reviews").add({
      ...req.body,
      timestamp: new Date().toISOString()
  })
  res.status(200).json({ reviews });
    } catch (e) {
      res.status(400).end();
    }
}

export const createPitch = async (req,res) => { 
    try {
        const { id } = await db.collection("pitch").add({
            ...req.body,
            timestamp: new Date().toISOString()
          });
          res.status(200).json({ id });
    }catch (err) {
        res.status(400).json({message : err})
    }
}

export const updatePitchByID = async (req,res) => {
    try{
      const { id } = req.params
        const pitchUpdated = await db.collection('pitch').doc(id).update({
            ...req.body,
          });
          res.status(200).json({ pitchUpdated })
    }catch(err){
        res.status(400).json({message : err})
    }
}

export const deletePitchByID = async (req, res) => {
    try{
        const { id } = req.params
        await db.collection('pitch').doc(id).delete();
        res.status(200).json({ message : 'Pitch deleted successfully'})
    }catch(err){
        res.status(400).json({message : err})
    }
}