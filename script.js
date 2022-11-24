let listUser = document.getElementById("listUser")

let Alert = document.getElementById("alert")

let Email = document.getElementById("email")
let Name = document.getElementById("name")
let Gender = document.getElementById("gender")
let Status = document.getElementById("status")

let btnCreate = document.getElementById("btnCreate")




getUser()
function getUser(){
fetch("https://gorest.co.in/public/v2/users/", {
    headers : 
    {
        Authorization :"Bearer fa632b156b4839baaa03eeecd27fbac1e1f82718f1723c8dbca29a90ed41894b"
    }
})
    .then(response => response.json())
    .then(data =>
        {
            console.log(data)
            data.forEach(showUser)
        })
    .catch(error => {
        console.log(error)
    });
}

    function showUser(value, index)
    {
        listUser.innerHTML += `
        <tr><td>${value.email}</td>
        <td>${value.name}</td>
        <td>${value.gender}</td>
        <td>${value.status}</td>
        <button class="btn btn-info ml-2" onclick="editUser(${value.id})">Edit</button>
        <button class="btn btn-danger ml-2 " onclick="deleteUser(${value.id} )">Delete</button>
        </tr>`
    }

    function deleteUser (id)
    {
        console.log("Hapus data id : " + id) 

        fetch("https://gorest.co.in/public/v2/users/" + id,
        {
            method : "DELETE",
            headers : 
            {
                Authorization :"Bearer fa632b156b4839baaa03eeecd27fbac1e1f82718f1723c8dbca29a90ed41894b"
            }

        })
        .then(response => 
            {
                console.log(response)
                listUser.innerHTML ="" // kosongkan tabel list user
                getUser()
            })
            .catch(error =>
            {
                console.log(error)
            });
    }
function createUser(statuSimpan = 0, id=0)
{
    if(statuSimpan == 0)
    {
        // Lakukan Simpan Data
        console.log("Button Simpan Di Tekan")

    fetch("https://gorest.co.in/public/v2/users/",
    {
    method : "POST",
    headers : 
            {   'Content-Type':'application/json',
                'Authorization' :"Bearer fa632b156b4839baaa03eeecd27fbac1e1f82718f1723c8dbca29a90ed41894b"
            },
        body: JSON.stringify(
            {
                "email" : Email.value,
                "name"  : Name.value,
                "gender" : Gender.value,
                "status" : Status.value
            })
    })
    .then(response => 
        {
            response.json()
            console.log(response.status)
            if(response.status ==  201)
            {
            Alert.innerHTML= `<div class ="alert alert-success"> User Have Been Saved</div>`
            }
            else
            {
                Alert.innerHTML = `<div class ="alert alert-danger">User Already Have Been Taken</div>`
            }
        })
    .then(result => 
        {
            console.log(result)
        })
    .catch(error =>
        {
            console.log(error)
        });    
    }
    else
    {
        //  Ubah Data
        console.log("Button Change Di Tekan")

        fetch("https://gorest.co.in/public/v2/users/" + id,
        {
        method : "PUT",
        headers : 
                {   'Content-Type':'application/json',
                    'Authorization' :"Bearer fa632b156b4839baaa03eeecd27fbac1e1f82718f1723c8dbca29a90ed41894b"
                },
            body: JSON.stringify(
                {
                    "email" : Email.value,
                    "name"  : Name.value,
                    "gender" : Gender.value,
                    "status" : Status.value
                })
        })
        .then(response => 
            {
                response.json()
                console.log(response.status) 
                if(response.status ==  200)
                {
                Alert.innerHTML= `<div class ="alert alert-success"> User Have Been Changed</div>`
                }
                else
                {
                    Alert.innerHTML = `<div class ="alert alert-danger">User Already Have Been Taken</div>`
                    
                }
                listUser.innerHTML ="" // kosongkan tabel list user
                getUser()
            })
        .then(result => 
            {
                console.log(result)
            })
        .catch(error =>
            {
                console.log(error)
            });   
        } 
}

function editUser(id)
{
    console.log(id);

    fetch("https://gorest.co.in/public/v2/users/" + id, {
        headers : 
        {
            Authorization :"Bearer fa632b156b4839baaa03eeecd27fbac1e1f82718f1723c8dbca29a90ed41894b"
        }
    })
    .then(response => response.json())
    .then(data => 
        {
            console.log(data)

            Email.value = data.email
            Name.value = data.name
            Gender.value = data.gender
            Status.value = data.status

            // Ubah Teks "Simpan" Menjadi Ubah

            btnCreate.innerHTML = "Change"

            btnCreate.setAttribute("onclick", "createUser(1, "+ id +")")
        })
    .catch(error =>
        {
            console.log(error)
        });   
    
}

