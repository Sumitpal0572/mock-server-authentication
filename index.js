document.getElementById("Submit").addEventListener("click", function () {
    postData();
})

async function postData() {
    let username = document.getElementById("Username").value
    let password = document.getElementById("Password").value

    let obj = {
        username,
        password
    }

    try {
        let response = await fetch(`https://json-with-auth.onrender.com/user/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(obj)
        })

        let data = await response.json()
        console.log(data);

        if (data.accessToken) {
            let alertmessage = document.getElementById("message")
            alertmessage.textContent = `Hey ${data.user.username}, welcome back!`;

            document.getElementById("todo-container").style.display = "block";

            //storing token and id in localStorage
            localStorage.setItem("localAccessToken", data.accessToken);
            localStorage.setItem("userId", data.user.id);
        }

    } catch (error) {
        console.log(error);
    }
}

//selecting fetchTodo button and adding eventlistener on click
let fetchBtn = document.getElementById("fetch-todo");
fetchBtn.addEventListener("click", function () {
    fetchData(); //function call to fetch data
});

//function to fetch todos
async function fetchData(accessToken, id) {
    id = localStorage.getItem("userId");
    accessToken = localStorage.getItem("localAccessToken");
    try {
        let res = await fetch(
            `https://json-with-auth.onrender.com/todos?userId=${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        let fetchedTodo = await res.json();
        console.log(fetchedTodo);
        displayTodo(fetchedTodo); //function call to display todos
    } catch (error) {
        console.log(error);
    }
}

//function to display todos
function displayTodo(fetchedTodo) {
    let container = document.getElementById("container");
    container.innerHTML = "";
    fetchedTodo.forEach((ele) => {
        let card = document.createElement("div");
        card.className = "card";

        let title = document.createElement("h2");
        title.textContent = ele.title;

        let status = document.createElement("p");
        status.textContent = ele.completed;

        card.append(title, status);
        container.append(card);
    });
}