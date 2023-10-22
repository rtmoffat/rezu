function send(e,form) {
    fetch(form.action, {method:'post', body: new FormData(form)})
    console.log('We send post asynchronously (AJAX)');
    e.preventDefault();
  }

async function login() {
  u=document.getElementById('#username')
  p=document.getElementById('#password')
  await fetch('./login',{method:'post',body:JSON.stringify({username:u,password:p}),
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then((response)=>{
      console.log(response)
    }).then((text)=>{
      document.body.innerHTML=text
    })
}
