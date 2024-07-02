document.getElementById("Submit").addEventListener("click", function () {
    postData();
})

async function postData(){
    let username = document.getElementById("Username").value
    let password = document.getElementById("Password").value
    console.log(username, password);
}