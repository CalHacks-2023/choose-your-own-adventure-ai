// import firebase from 'firebase/app';
// import 'firebase/firestore';
// var admin = require("firebase-admin");
// var serviceAccount = require("../../../calhacks_firebase.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// const db = admin.firestore(); // Initialize the Firestore instance

const promptChat = async () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = "gpt-3.5-turbo";
  const maxTokens = 200;
  let finalPrompt = `Can you give me an intro to a choose your own adventure game?`;
  const apiUrl = `https://api.openai.com/v1/chat/completions`;
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

  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
  // });
  // console.log(completion.data.choices[0].message);


export default async function handler(req, res) {
  let method = req.method;
  let body = JSON.parse(req.body);
  console.log('body', body)

  if (method === "POST") {
    // const { name, biome, difficulty } = req.body;
    // let data = await promptChat();
    // console.log('data', data);

    // const docRef = db.collection('initValues').doc(); // Create a new document reference
    // const docData = {
    //   name: name,
    //   biome: biome,
    //   difficulty: difficulty
    // };
    // await docRef.set(docData); // Set the data in the document

    // const snapshot = await db.collection('initValues').get(); // Fetch the data from the collection
    // snapshot.forEach(doc => {
    //   console.log('Document ID:', doc.id);
    //   console.log('Document data:', doc.data());
    // });
    const data = await promptChat();
    res.status(200).json({ data: data });
  }
}
