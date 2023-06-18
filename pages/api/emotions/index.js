export default async function handler(req, res) {
  let method = req.method;

  if (method === "POST") {
    let body = JSON.parse(req.body);
    console.log('req.body', req.body)
    const data = await fetch('http://localhost:8081/characterInit', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('data', data)
    res.status(200).json({ data : 'data saved'});
  }

  if (method === "GET") {
    console.log('getInitialRespose', 'inside GET')
    const data = await fetch('http://localhost:8081/getInitialResponse', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.text();
    console.log('response', response)
    // const response = await data.json();
    // console.log('response', response)
    res.status(200).json({ data : 'got initial response'});
  }

}