var data = document.getElementById("data")
var welcome = document.getElementById("welcome")
var loadermain = document.getElementById("loadermain")
var main = document.getElementById("main")
var inpp = document.getElementById("input")
var notfound = document.getElementById("notfound")
var networkerror = document.getElementById("networkerror")
var togmain = document.getElementById("togmain")
data.appendChild(welcome)
setTimeout(() => {
    welcome.classList.add("d-none")
    home()
}, 3000);

// function fixedNav(){
// document.addEventListener("DOMContentLoaded", function(){
//     window.addEventListener('scroll', function() {
//         if (window.scrollY > 1) {
//           document.getElementById('navbar-top').classList.add('fixed-top');
//           navbar_height = document.querySelector('.navbar').offsetHeight;
//           document.body.style.paddingTop = navbar_height + 'px';
//         } else {
//           document.getElementById('navbar-top').classList.remove('fixed-top');
//           document.body.style.paddingTop = '0';
//         } 
//     });
//   }); 
// }
// fixedNav()

function home() {
    loadermain.classList.remove("d-none")
    data.innerHTML = ""
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            for (var i = 0; i < res.length; i++) {
                // console.log()
                data.innerHTML += `<div class="card mycard m-2" style="width: 18rem;">
                <div class="imagediv">
                <img class="card-img-top myimage" src="${res[i].image}" alt="Card image cap">
                </div>
                <div class="card-body">
                <div class="tit">
                <h5 class="card-title title">${res[i].title}</h5>
                </div>
                <p class="card-text myp">Price: ${res[i].price}$</p>
                <p class="card-text myp2">${res[i].category}</p>
                <a class="btn btn-primary" onclick="tog('${i}')">Explore More</a>
                </div>
                </div>`
            }

            loadermain.classList.add("d-none")
            data.style.animation = "fade 1s ease 1"
        })
        .catch(err => {
            loadermain.classList.add("d-none")
            data.appendChild(networkerror)
            networkerror.classList.remove("d-none")
        })
}


function srch() {
    loadermain.classList.remove("d-none")
    data.innerHTML = ""
    input = inpp.value.toLowerCase().trim()
    // console.log(input)
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            var flag = 1
            for (var i = 0; i < res.length; i++) {
                // console.log()
                var response = res[i].title.toLowerCase()
                // console.log(response)
                if (response.includes(input)) {
                    flag = flag + 1
                    // console.log("true")
                    data.innerHTML += `<div id="mycard" class="card mycard m-2" style="width: 18rem;">
            <div class="imagediv">
            <img class="card-img-top myimage" src="${res[i].image}" alt="Card image cap">
            </div>
            <div class="card-body">
            <div class="tit">
            <h5 class="card-title title">${res[i].title}</h5>
            </div>
            <p class="card-text myp">Price: ${res[i].price}$</p>
            <p class="card-text myp2">${res[i].category}</p>
            <a class="btn btn-primary" onclick="tog('${i}')">Explore More</a>
            </div>
            </div>`
                    loadermain.classList.add("d-none")
                    inpp.value = ""
                }
                // console.log(notfound)
            }
            if (flag == 1) {
                // console.log("false")
                loadermain.classList.add("d-none")
                data.appendChild(notfound)
                notfound.classList.remove("d-none")

            }

            loadermain.classList.add("d-none")
            data.style.animation = "fade 2s ease 1"
        })
        .catch(err => {
            console.log("error")
            loadermain.classList.add("d-none")
            data.appendChild(networkerror)
            networkerror.classList.remove("d-none")
        })
}

// category

function recall(value) {
    if (value == "menclothing") {
        value = "men's clothing"
    }
    else if (value == "womenclothing") {
        value = "women's clothing"
    }
    var inpvalue = value.slice(0, 6)
    loadermain.classList.remove("d-none")
    data.innerHTML = ""
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            var flag = 1
            for (var i = 0; i < res.length; i++) {
                var rescat = res[i].category.slice(0, 6)
                if (rescat.includes(inpvalue)) {
                    flag = flag + 1
                    // console.log("true")
                    data.innerHTML += `<div id="mycard" class="card mycard m-2" style="width: 18rem;">
            <div class="imagediv">
            <img class="card-img-top myimage" src="${res[i].image}" alt="Card image cap">
            </div>
            <div class="card-body">
            <div class="tit">
            <h5 class="card-title title">${res[i].title}</h5>
            </div>
            <p class="card-text myp">Price: ${res[i].price}$</p>
            <p class="card-text myp2">${res[i].category}</p>
            <a class="btn btn-primary" onclick="tog('${i}')">Explore More</a>
            </div>
            </div>`
                    loadermain.classList.add("d-none")
                    inpp.value = ""
                }
            }

            loadermain.classList.add("d-none")
            data.style.animation = "fade 2s ease 1"
        })
        .catch(err => {
            console.log("error")
            loadermain.classList.add("d-none")
            // notfound.classList.remove("d-none")
            data.appendChild(networkerror)
            networkerror.classList.remove("d-none")
        })
}


function tog(value) {
    loadermain.classList.remove("d-none")
    // console.log(togmain)
    var togtitle = document.getElementById("togtitle")
    var togdescription = document.getElementById("togdescription")
    var togprice = document.getElementById("togprice")
    var tograting = document.getElementById("tograting")
    var togimagediv = document.getElementById("togimagediv")
    var togcategory = document.getElementById("togcategory")
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            // console.log(res[0].rating.rate)
            togtitle.innerHTML = res[value].title
            togdescription.innerHTML = res[value].description
            togprice.innerHTML = res[value].price + "$"
            tograting.innerHTML = res[value].rating.rate
            togcategory.innerHTML = res[value].category
            var imagetog = res[value].image
            togmain.classList.remove("d-none")
            togimagediv.setAttribute("style", `background:linear-gradient(rgba(0, 0, 0, 0.500)50%, rgba(0, 0, 0, 0.500)50%) ,url(${imagetog}) no-repeat;`)
            loadermain.classList.add("d-none")
        })
}

var closebbtn = document.getElementById("closebtn")
closebbtn.addEventListener("click", () => {
    togmain.classList.add("d-none")

})






let showbtn = document.getElementById("showlogin")
let btn = document.getElementById("btn")
let loginpage = document.getElementById("loginpage")
let email = document.getElementById("email")
let password = document.getElementById("password")
let p1 = document.getElementById("p1")
let p2 = document.getElementById("p2")
let uname = document.getElementById("uname")
let unamediv = document.getElementById("unamediv")
let logincom = document.getElementById("logincom")
let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
email.value = ""
password.value = ""
uname.value = ""

// for border
function showlogin(){
    loginpage.classList.remove("d-none")

}
function border() {

    setInterval(() => {
        if (uname.value !=""){
            
            uname.style.border = "1px Solid #ff7423"
        }
        else{
            uname.style.border = "1px Solid red"
            
        }

        if (email.value != "" && email.value.match(emailFormat)) {
            email.style.border = "1px Solid #ff7423"
        }
        else {
            email.style.border = "1px Solid red"
        }
        if (password.value != "" && password.value.length > 7) {

            password.style.border = "1px Solid #ff7423"
        }
        else {
            password.style.border = "1px Solid red"

        }
    }, 1);
}

// for sign up

function signup() {
    border()
    // console.log("sign up")
    if (email.value.match(emailFormat)) {
        email.style.border = "1px Solid #ff7423"
        p1.innerHTML = p1
        p1.classList.add("p1")
        // console.log("@true")
        p1.innerHTML = "this email is already registered.."
        let gett = localStorage.getItem(email.value)

        if (gett == email.value) {
            
            p1.classList.add("p11")
        }
        else {
            
            p1.classList.remove("p11")

            //
            if (password.value.length == 0) {
                // console.log("password length 0")
            }
            else if (password.value.length < 8) {
                
                email.style.border = "1px Solid red"
                password.style.border = "1px Solid red"
                p2.classList.add("p22")
            }
            else {
                if(uname.value != ""){
                email.style.border = "1px Solid #ff7423"
                password.style.border = "1px Solid #ff7423"
                p2.classList.remove("p22")
                let e = localStorage.setItem(email.value, email.value)
                let p = localStorage.setItem(email.value + "pass", password.value)
                let u = localStorage.setItem(email.value + "uname",uname.value)
                // alert("registraion completed")
                toggle()
                }
            }
        }
        
    }
    else {
        
        p1.classList.remove("p1")
        p1.style.color = "#ff7423"
        p1.innerHTML = "Please Enter the Valid Email"
        
    }
    
}


function login() {
    border()
    // console.log("login")
    let loginEmail = localStorage.getItem(email.value)
    let loginPassword = localStorage.getItem(email.value + "pass")
    let loginuname = localStorage.getItem(email.value + "uname")
    // console.log(loginuname)
    if (loginEmail == email.value && loginPassword == password.value) {
        p1.classList.remove("p11")
        email.value = ""
        password.value = ""
        // showbtn.style="border: none !important;box-shadow: none !important; cursor:default !important;letter-spacing:0px !important;padding: 0px 0px !important;"
        showbtn.classList.add("d-none")
        loginpage.classList.add("d-none")
        logincom.innerHTML=loginuname.replace(" ","&nbsp;")
        logincom.classList.remove("d-none")
    }
    else {
        // alert("wrong")
        p1.innerHTML = "your email and password is wrong"
        p1.classList.add("p11")
    }

}
function toggle() {
    // email.value = ""
    // password.value = ""
    var para = document.getElementById("para")
    var anc = document.getElementById("anc")
    // console.log(para.innerHTML)
    var para1 = "already have an account"
    var para2 = "don,t have an account"

    if (para.innerHTML == para1) {
        unamediv.classList.add("d-none")
        p2.classList.remove("p22")
        p1.classList.remove("p11")
        p1.classList.add("p1")
        p2.classList.add("p2")
        para.innerHTML = para2
        btn.innerHTML = "LogIn"
        anc.innerHTML = "register now"
        btn.onclick = "login()"
        btn.setAttribute("onclick", "login()")
    }

    else {
        unamediv.classList.remove("d-none")
        p1.classList.remove("p11")
        p1.classList.add("p1")
        para.innerHTML = para1
        btn.innerHTML = "Sign Up"
        anc.innerHTML = "logIn"
        btn.onclick = "data()"
        btn.setAttribute("onclick", "signup()")

    }

}


// for offliine testing

// function offline(){
//     data.innerHTML += `<div class="card mycard m-3" style="width: 20rem;">
//     <div class="imagediv">

//         <img class="card-img-top myimage" src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
//             alt="Card image cap">
//     </div>
//     <div class="card-body">
//         <div class="tit">
//          <h5 class="card-title title">dfgdfgdgdgf</h5>
//         </div>
//         <p class="card-text myp">zdddfvxcx</p>
//         <p class="card-text myp2">xcxcxxc</p>
//         <a href="#" class="btn btn-primary">zddsd fc</a>
//     </div>
// </div>`
// }
// console.log(inpp.value.toLowerCase())

