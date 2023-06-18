export default async function handler(req, res) {
  const method = req.method;
  if (method === "GET") {
    console.log('getInitialRespose', 'inside GET')
    const data = await fetch('http://localhost:8081/inputExpression', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('data', data)
    const response = await data.text();
    console.log('response', response)
    // const response = await data.json();
    // console.log('response', response)
    res.status(200).json({ data : 'got initial response'});
  }
}