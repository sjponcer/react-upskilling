export async function getMessages() {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments?_limit=5");
    return res.json();
  }
  
  export async function postMessage(newMessage) {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
    return res.json();
  }
  