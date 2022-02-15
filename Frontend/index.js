function signup(){
    let inputDatas = {
        name : document.getElementById('name').value,
        password : document.getElementById('password').value
    }
    console.log(inputDatas)
    let url = "http://localhost:3000/api/auth/signup"
    let options = {
        method: "POST",
        body: JSON.stringify(inputDatas),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log(options)
    fetch(url, options)
        .then(res => res.json())
        .then((res) => {
            localStorage.setItem("userId", res.userId);
            localStorage.setItem("token", res.token);
            console.log(localStorage)
            document.getElementById("result").innerText = "Welcome" + nameId ;
        })
        .catch(error => console.log(error))
}
  

