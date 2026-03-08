const btnClick=()=>{
    const username= document.getElementById("username")
    const user=username.value
    const password=document.getElementById("password")
    const passwordvalue=password.value
    
    if (user=== "admin" && passwordvalue==="admin123") {
            alert("login successful")
            window.location.assign("home.html")
    } else {
        alert("login failed")
        return;
    }
}
window.onload = () =>{
    const allBtn = document.getElementById('btn-all');
    if(allBtn) {
        allBtn.classList.remove('btn-soft');
    }
};
const BTNclick=(clickedbutton)=>{
const allbutton = document.querySelectorAll(".btn")
allbutton.forEach(btt => {
  btt.classList.add("btn-soft")
});
clickedbutton.classList.remove("btn-soft")
return;
}