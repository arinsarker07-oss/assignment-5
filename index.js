
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

const manageSpiner=(spin)=>{
    if (spin===true) {
        document.getElementById("spiner").classList.remove("hidden");
        document.getElementById("all-card-section").classList.add("hidden");
    }
    else{
         document.getElementById("all-card-section").classList.remove("hidden");
        document.getElementById("spiner").classList.add("hidden");
    }
}

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
 manageSpiner(true);
fetch(url)
    .then((response) => response.json())
    .then((result) => {
        allIssues = result.data
        displayLevelwords(allIssues)
          manageSpiner(false);
    })


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



        card.innerHTML = `
            <div  class="card bg-white shadow-sm border-t-4 border-${color}-500 h-full">
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
        card.onclick = () => showDetails(word.id);
        card.classList.add("cursor-pointer");
        allcardsection.append(card);
    });
}

document.getElementById("btn-Search").addEventListener("click", () => {
    const input = document.getElementById("input-Search");
    const searchText = input.value.toLowerCase();
    if (searchText !== "") {
         manageSpiner(true);
        const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
        fetch(searchUrl)
            .then(res => res.json())
            .then(result => {
                displayLevelwords(result.data);
                 manageSpiner(false);
            })
    }
});

const showDetails = (id) => {
    const detailUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    fetch(detailUrl)
        .then(res => res.json())
        .then(result => {
            const issue = result.data;
            const modalcard = document.getElementById("modal-card");
            modalcard.innerHTML = "";
            const mcard = document.createElement("div");

            const Mstatus = issue.status
            console.log(Mstatus);
            
            let mfstatus = ""
            if (Mstatus=== "open") {
                mfstatus = `<div class="badge badge-success badge-soft badge-sm py-2 px-2 uppercase">${issue.status}</div>`
            }
            else {
               mfstatus = `<div class="badge badge-primary badge-soft badge-sm py-2 px-2 uppercase">${issue.status}</div>`
            }

            const Mispriority = issue.priority
            let Mbadgecolor = ""
            if (Mispriority === "high") {
                Mbadgecolor = `<div class="badge badge-error badge-soft text-[16px] font-bold uppercase">${issue.priority}</div>`
            }
            else if (Mispriority === "medium") {
                Mbadgecolor = `<div class="badge badge-warning badge-soft text-[16px] font-bold uppercase">${issue.priority}</div>`
            }
            else {
                Mbadgecolor = `<div class="badge badge-Info badge-soft text-[16px] font-bold uppercase">${issue.priority}</div>`
            }
            mcard.innerHTML = `
                <div class="max-w-xl mx-auto p-4">
                    <div class="card bg-base-100 shadow-sm border border-base-200 p-5 rounded-xl font-sans">
                        <h2 class="text-3xl font-bold text-slate-800 mb-4">${issue.title}</h2>
                        
                        <div class="flex items-center gap-3 text-sm text-slate-500 mb-6">
                            ${mfstatus}
                            <span>•</span>
                            <span>Opened by <span class="font-medium text-slate-600">${issue.author}</span></span>
                            <span>•</span>
                            <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p class="text-slate-500 text-lg leading-relaxed mb-7">${issue.description}</p>
                        <div class="bg-slate-50/50 rounded-xl p-4 flex justify-between items-start">
                            <div class="flex flex-col gap-2">
                                <span class="text-slate-400 text-lg">Assignee:</span>
                                <span class="text-slate-800 font-bold text-xl">${issue.author}</span>
                            </div>
                            <div class="flex flex-col gap-2">
                                <span class="text-slate-400 text-lg">Priority:</span>
                               ${Mbadgecolor}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            modalcard.append(mcard);
            document.getElementById("issue_modal").showModal();
        });
};
