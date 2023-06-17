import { createClient } from '@supabase/supabase-js';
import firebase from 'firebase/app';
import 'firebase/firestore';
var admin = require("firebase-admin");
var serviceAccount = require("../../../calhacks_firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); // Initialize the Firestore instance

const promptChat = async () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = "text-davinci-003";
  const maxTokens = 200;
  let finalPrompt = `Can you give me an intro to a choose your own adventure game?`;
  const apiUrl = `https://api.openai.com/v1/engines/${model}/completions`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        prompt: finalPrompt,
        max_tokens: maxTokens,
      }),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.choices[0].text.replace(/\\/g, '');
    }
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export default async function handler(req, res) {
  let method = req.method;
  let body = JSON.parse(req.body);

  if (method === "POST") {
    const { name, biome, difficulty } = req.body;
    let data = await promptChat();
    console.log('data', data);

    const docRef = db.collection('initValues').doc(); // Create a new document reference
    const docData = {
      name: name,
      biome: biome,
      difficulty: difficulty
    };
    await docRef.set(docData); // Set the data in the document

    const snapshot = await db.collection('initValues').get(); // Fetch the data from the collection
    snapshot.forEach(doc => {
      console.log('Document ID:', doc.id);
      console.log('Document data:', doc.data());
    });

    res.status(200).json({ data: data });
  }
}
