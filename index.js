
const btnClick = () => {
    const username = document.getElementById("username")
    const user = username.value
    const password = document.getElementById("password")
    const passwordvalue = password.value

    if (user === "admin" && passwordvalue === "admin123") {
        alert("login successful")
        window.location.assign("home.html")
    } else {
        alert("login failed")
        return;
    }
}
window.onload = () => {
    const allBtn = document.getElementById('btn-all');
    if (allBtn) {
        allBtn.classList.remove('btn-soft');
    }

};
const BTNclick = (clickedbutton) => {
    const allbutton = document.querySelectorAll(".btn")
    allbutton.forEach(btt => {
        btt.classList.add("btn-soft")
    });
    clickedbutton.classList.remove("btn-soft")
    return;
}

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
fetch(url)
    .then((response) => response.json())
    .then((result) => displayLevelwords(result.data))

const displayLevelwords = (words) => {
     const allcardsection = document.getElementById("all-card-section")
     allcardsection.innerHTML = ""
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
           <div class="card bg-base-100  shadow-sm ">
  <figure class="flex justify-between p-5 ">
  <div class="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center"><p class="border-2 border-dashed border-green-600 rounded-full h-4 w-4 "></p></div>
   <div class="badge badge-error  badge-soft">HIGH</div>
  </figure>

  <div class="card-body">
    <h2 class="card-title font-semibold text-[#1F2937]">
      Fix navigation menu on mobile <br> devices
    </h2>
    <p class="text-[#64748B] text-[12px] ">The navigation menu doesn't collapse <br> properly on mobile devices...</p>
    <div class="card-actions flex flex-row">
      <div class="badge badge-error badge-soft"><i class="fa-solid fa-bug"></i>BUG</div>
      <div class="badge badge-warning badge-soft"><i class="fa-solid fa-life-ring"></i>HELP WANTED</div>
    </div>
    <p class="border border-gray-300"></p>
    <p class="text-[#64748B] text-[12px] ">#1by john_doe</p>
    <p class="text-[#64748B] text-[12px] ">1/15/2024</p>
  </div>
</div> 
        `
        allcardsection.append(card)
    });

}