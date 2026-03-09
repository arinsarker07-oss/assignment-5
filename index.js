
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

const statusType = clickedbutton.innerText.toLowerCase().trim();
    if (statusType === "all") {
        displayLevelwords(allIssues);
    } 
    else if (statusType === "open") {
        const openData = allIssues.filter(item => item.status === "open");
        displayLevelwords(openData);
    } 
    else if (statusType === "close") {
        const closedData = allIssues.filter(item => item.status === "closed");
        displayLevelwords(closedData);
    }
}

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
fetch(url)
    .then((response) => response.json())
    .then((result) =>{
         allIssues = result.data
        displayLevelwords(allIssues)
    } )


const displayLevelwords = (words) => {
    const allcardsection = document.getElementById("all-card-section");
    allcardsection.innerHTML = "";
document.getElementById("issue-count").innerText = `${words.length} Issues`;
    words.forEach(word => {
        const card = document.createElement("div");
        card.className = "h-full";
        const isopen = word.status === 'open';
        const color = isopen ? 'green' : 'purple';
        const statusicon = isopen
            ? `<div class="h-4 w-4 rounded-full border-2 border-dashed border-green-600"></div>`
            : `<i class="fa-regular fa-circle-check text-lg text-purple-600"></i>`;

        const ispriority = word.priority
        let badgecolor = ""
        if (ispriority === "high") {
            badgecolor = `<div class="badge badge-error badge-soft text-[10px] font-bold uppercase">${word.priority}</div>`
        }
        else if (ispriority === "medium") {
            badgecolor = `<div class="badge badge-warning badge-soft text-[10px] font-bold uppercase">${word.priority}</div>`
        }
        else {
            badgecolor = `<div class="badge badge-Info badge-soft text-[10px] font-bold uppercase">${word.priority}</div>`
        }
        const islabel = word.labels.map(label => {
            let eatchLable = ""
            const cleanLabel = label.toLowerCase().trim();
            
            if (cleanLabel === "bug") {
                eatchLable = ` <div class="badge badge-error badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                            <i class="fa-solid fa-bug"></i> BUG
                        </div>`
            }
            else if (cleanLabel === "help wanted") {
                eatchLable = ` <div class="badge badge-warning badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                           <i class="fa-solid fa-life-ring"></i>HELP WANTED
                        </div>`
            }
            else if (cleanLabel === "enhancement") {
                eatchLable = ` <div class="badge badge-success badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                           <i class="fa-solid fa-life-ring"></i>ENHANCEMENT
                        </div>`
            }
            else if (cleanLabel === "good first issue") {
                eatchLable = ` <div class="badge badge-info badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                           <i class="fa-solid fa-life-ring"></i>GOOD FIRST ISSUE
                        </div>`
            }
            else {
                eatchLable = ` <div class="badge badge-primary badge-soft badge-sm text-[9px] gap-1 py-2 px-2 whitespace-nowrap">
                           <i class="fa-solid fa-life-ring"></i>DOCUMENTATION
                        </div>`
            }
             return eatchLable;
        }).join("");


    card.style.cursor = "pointer";
        card.innerHTML = `
            <div onclick=" document.getElementById('my_modal_1').showModal()" class="card bg-white shadow-sm border-t-4 border-${color}-500 h-full">
                <figure class="flex justify-between p-4 pb-2">
                    <div class="h-7 w-7 rounded-full bg-${color}-100 flex items-center justify-center">
                       ${statusicon}
                    </div>
                   ${badgecolor}
                </figure>
                <div class="p-4 pt-0 space-y-2 flex-grow">
                    <h2 class="card-title font-semibold text-[#1F2937] text-sm leading-tight">
                        ${word.title}
                    </h2>
                    <p class="text-[#64748B] text-[11px] line-clamp-2">
                        ${word.description}
                    </p>
                    <div class="card-actions flex-wrap gap-1 mt-3">
                    ${islabel}
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

document.getElementById("btn-Search").addEventListener("click", () => {
    const input = document.getElementById("input-Search");
    const searchText = input.value.toLowerCase();
       if (searchText!=="") {
         const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
        fetch(searchUrl)
            .then(res => res.json())
            .then(result => {
                displayLevelwords(result.data);
            })
       }
});
