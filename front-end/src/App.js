import "./App.css";

function App() {
  console.log("hello");
  const obj={
    username:"alaeddin",
    password: "asdfasdf"
  }
  fetch("api/auth/login",{
    headers:{
      "content-type":"application/json",
    },
    method:"post",
    body:JSON.stringify(obj)
  }).then(resp=>Promise.all([resp.json(),resp.headers]))
  .then(([body,headers])=>{
    const authorization=headers.get("authorization");
    headers.forEach(el=>console.log(el));
    console.log(body);
  });

  return (
    <div className="App">
      <h1>Hello </h1>
    </div>
  );
}

export default App;
