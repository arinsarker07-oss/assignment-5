
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
    const allbutton = document.querySelectorAll(".btn-w")
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
    const allcardsection = document.getElementById("all-card-section");
    allcardsection.innerHTML = "";

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");
        card.className = "h-full";
        const isopen = word.status === 'open';
        const color = isopen ? 'green' : 'purple';
        const statusicon = isopen
            ? `<div class="h-4 w-4 rounded-full border-2 border-dashed border-green-600"></div>`
            : `<i class="fa-regular fa-circle-check text-lg text-purple-600"></i>`;
        card.innerHTML = `
            <div class="card bg-white shadow-sm border-t-4 border-${color}-500 h-full">
                <figure class="flex justify-between p-4 pb-2">
                    <div class="h-7 w-7 rounded-full bg-${color}-100 flex items-center justify-center">
                       ${statusicon}
                    </div>
                    <div class="badge badge-error badge-soft text-[10px] font-bold uppercase">${word.priority}</div>
                </figure>
                <div class="p-4 pt-0 space-y-2 flex-grow">
                    <h2 class="card-title font-semibold text-[#1F2937] text-sm leading-tight">
                        ${word.title}
                    </h2>
                    <p class="text-[#64748B] text-[11px] line-clamp-2">
                        ${word.description}
                    </p>
                    <div class="card-actions flex-wrap gap-1 mt-3">
                        <div class="badge badge-error badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                            <i class="fa-solid fa-bug"></i> BUG
                        </div>
                        <div class="badge badge-warning badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                           <i class="fa-solid fa-life-ring"></i>HELP WANTED
                        </div>
                    </div>
                </div>
                <div class="p-4 pt-0">
                    <div class="border-t border-gray-100 my-2"></div>
                    <p class="text-[#64748B] text-[11px]">#${word.id} by ${word.author}</p>
                    <p class="text-[#64748B] text-[11px]">${new Date(word.createdAt).toLocaleDateString()}</p>
                </div>
            </div> 
        `;
        allcardsection.append(card);
    });
}
