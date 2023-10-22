function send(e,form) {
    fetch(form.action, {method:'post', body: new FormData(form)})
    console.log('We send post asynchronously (AJAX)');
    e.preventDefault();
}

async function loadTables() {
  await fetch('./listTables',{
  method: "POST", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  body:JSON.stringify({restaurant:$('#restaurants option:selected').val()})
}).then((response)=>{
    response.json()
      .then((items)=>{
        $.each(items,(i,item) => {
          console.log(i)
          $('#tables').append($('<option>',{
            value:item.tableId,
            text:item.tableId+' '+item.totalSeats+' '+item.seatsAvailable
          }))
        })
        console.log(items)
      }) 
  })
}

async function loadRestaurants() {
  await fetch('./listRestaurants',{
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  }
}).then((response)=>{
    response.json()
      .then((items)=>{
        $.each(items,(i,item) => {
          console.log(i)
          $('#restaurants').append($('<option>',{
            value:i,
            text:i
          }))
        })
        console.log(items)
      }) 
  })
}

loadRestaurants();
/*$.each(items, function (i, item) {
  $('#mySelect').append($('<option>', { 
      value: item.value,
      text : item.text 
  }));
});*/

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
