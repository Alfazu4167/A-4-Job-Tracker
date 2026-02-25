let totalInterview = [];
let totalRejected = [];
let currentStatus = 'all-btn'

let totalCount = document.getElementById('totalCount');
// console.log(totalCount.innerText);
let totalJob = document.getElementById('total-job')
// console.log();


let InterviewCount = document.getElementById('InterviewCount');
let rejectedCount = document.getElementById('rejectedCount');



const allBtn = document.getElementById('all-btn');
const interviewBtn = document.getElementById('interview-filter-btn');
const rejectedBtn = document.getElementById('rejected-filter-btn');
const cardSection = document.getElementById('cards')
const mainSection = document.querySelector('main');

const filteredSection = document.getElementById('filtered-section')

const noJobs = document.getElementById('no-jobs');

const deletesBtn = document.getElementsByClassName('delete-btn')

const totalJobs = document.getElementById('totalJobs')

// let filteredJob = document.getElementById('filtered-job')

let selectedJob = document.getElementById('selected-job')
// console.log(mainSection);

// console.log(cardSection.children.length);
// console.log(selectedJob);


function calculateCount() {
    totalCount.innerText = cardSection.children.length;
    totalJob.innerText = cardSection.children.length;
    InterviewCount.innerText = totalInterview.length;
    rejectedCount.innerText = totalRejected.length;
    selectedJob.innerText = totalInterview.length;

    // console.log(selectedJob);
    
}

calculateCount();




function toggleStyle(id) {
    allBtn.classList.add('bg-white', 'text-[#64748B]')
    interviewBtn.classList.add('bg-white', 'text-[#64748B]')
    rejectedBtn.classList.add('bg-white', 'text-[#64748B]')

    allBtn.classList.remove('bg-[#3b82f6]', 'text-white')
    interviewBtn.classList.remove('bg-[#3b82f6]', 'text-white')
    rejectedBtn.classList.remove('bg-[#3b82f6]', 'text-white')



    let selected = document.getElementById(id);



    currentStatus = id;



    selected.classList.remove('bg-white', 'text-[#64748B]')
    selected.classList.add('bg-[#3b82f6]', 'text-white')

    if (id == 'interview-filter-btn') {
        if (totalInterview.length == 0 ) {
            noJobs.classList.remove('hidden')
        }else if (totalInterview.length > 0){
            alfaz.classList.remove('hidden')
        } 
        
        
        else {
            noJobs.classList.add('hidden')
        }

        cardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden')
        renderInterview()



    } else if (id == 'all-btn') {
        cardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden')
        noJobs.classList.add('hidden')
    } else if (id == 'rejected-filter-btn') {
        if (totalRejected.length == 0) {
            noJobs.classList.remove('hidden')
        } else {
            noJobs.classList.add('hidden')
        }
        cardSection.classList.add('hidden');
        filteredSection.classList.remove('hidden')
        renderRejected();

    }
}

mainSection.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobPosition = parentNode.querySelector('.job-position').innerText;
        const jobStatus = parentNode.querySelector('.job-status');

        const jobDetails = parentNode.querySelector('.job-details').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.job-status').innerText = 'Interview'

        const cardInfo = {
            jobTitle,
            jobPosition,
            jobDetails,
            jobStatus: 'Interview',
            jobDescription
        }

        const jobExist = totalInterview.find(item => item.jobTitle == cardInfo.jobTitle)

        if (!jobExist) {
            totalInterview.push(cardInfo)
        }

        if (totalInterview.length > 0) {
            
            const p = document.createElement('p');
            p.innerText=`
            ${selectedJob} out of
            `

            filteredJob.appendChild(p)
        }


        totalRejected = totalRejected.filter(item => item.jobTitle != cardInfo.jobTitle)


        if (currentStatus == 'interview-btn') {
            if (totalInterview.length == 0) {
                noJobs.classList.remove('hidden')
            } else {
                noJobs.classList.add('hidden')
            }

            // renderInterview();
        }

        calculateCount()


    } else if (event.target.classList.contains('rejected-btn')) {
        console.log(event.target);

        const parentNode = event.target.parentNode.parentNode;

        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobPosition = parentNode.querySelector('.job-position').innerText;
        const jobStatus = parentNode.querySelector('.job-status');

        const jobDetails = parentNode.querySelector('.job-details').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.job-status').innerText = 'Rejected'

        const cardInfo = {
            jobTitle,
            jobPosition,
            jobDetails,
            jobStatus: 'Rejected',
            jobDescription
        }

        const jobExist = totalRejected.find(item => item.jobTitle == cardInfo.jobTitle)



        if (!jobExist) {
            totalRejected.push(cardInfo)
        }

        

        totalInterview = totalInterview.filter(item => item.jobTitle != cardInfo.jobTitle)


        if (currentStatus == "rejected-filter-btn") {

            if (totalRejected.length == 0) {
                noJobs.classList.remove('hidden')
            } else {
                noJobs.classList.add('hidden')
            }
            // renderRejected();
        }
        calculateCount()

    }

})


filteredSection.addEventListener('click', function (event) {
    const parentNode = event.target.parentNode.parentNode;


    const jobTitle = parentNode.querySelector('.job-title').innerText;


    if (event.target.classList.contains('interview-filter-btn')) {
        const job = totalRejected.find(item => item.jobTitle === jobTitle);
        if (job) {
            job.jobStatus = 'Interview';
            totalInterview.push(job);
            totalRejected = totalRejected.filter(item => item.jobTitle !== jobTitle);
        }
        renderRejected();
    }

    else if (event.target.classList.contains('rejected-filter-btn')) {
        const job = totalInterview.find(item => item.jobTitle === jobTitle);
        if (job) {
            job.jobStatus = 'Rejected';
            totalRejected.push(job);
            totalInterview = totalInterview.filter(item => item.jobTitle !== jobTitle);
        }
        renderInterview();
    }

    if (currentStatus === 'interview-filter-btn' && totalInterview.length === 0) {
        noJobs.classList.remove('hidden');
        
    } else if (currentStatus === 'rejected-filter-btn' && totalRejected.length === 0) {
        noJobs.classList.remove('hidden');
        
    }

    calculateCount();
});






function renderInterview() {
    filteredSection.innerHTML = '';

    for (let interview of totalInterview) {
        // console.log(interview.jobStatus);

        let div = document.createElement('div');
        div.className = 'card-container flex justify-between shadow-xl p-10 rounded-md'
        div.innerHTML = `
        <div class="card-left space-y-4">
                    <div class="space-y-4">
                        <h3 class="job-title font-bold text-xl text-[#002C5C]">${interview.jobTitle}</h3>
                        <p class="text-[#64748b] job-position ">${interview.jobPosition}</p>
                        <p class="text-[#64748b] text-[14px] job-details">${interview
                .jobDetails
            }</p>
                        <h5 class="btn bg-transparent border-green-500 text-green-500 job-status">${interview.jobStatus}
                        </h5>
                        <p class="job-description text-[#323b49] text-[14px]">${interview
                .jobDescription
            }</p>
                    </div>
                    <div class="flex gap-3 ">
                        <button class="btn bg-transparent border-green-500 text-green-500 interview-filter-btn">INTERVIEW</button>
                        <button class="btn bg-transparent border-red-500 text-red-500 rejected-filter-btn">REJECTED</button>
                    </div>
                </div>
                <div class="card-right delete-btn btn rounded-full h-8 w-8 p-0">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
        `

        filteredSection.appendChild(div);
    }
}

function renderRejected() {
    filteredSection.innerHTML = '';

    for (let rejected of totalRejected) {
        console.log(rejected);

        let div = document.createElement('div');
        div.className = 'card-container flex justify-between shadow-xl p-10 rounded-md'
        div.innerHTML = `
        <div class="card-left space-y-4">
                    <div class="space-y-4">
                        <h3 class="job-title font-bold text-xl text-[#002C5C]">${rejected.jobTitle}</h3>
                        <p class="text-[#64748b] job-position ">${rejected.jobPosition}</p>
                        <p class="text-[#64748b] text-[14px] job-details">${rejected
                .jobDetails
            }</p>
                        <h5 class="btn bg-transparent border-red-500 text-red-500 job-status">${rejected.jobStatus}
                        </h5>
                        <p class="job-description text-[#323b49] text-[14px]">${rejected
                .jobDescription
            }</p>
                    </div>
                    <div class="flex gap-3 ">
                        <button class="btn bg-transparent border-green-500 text-green-500 interview-filter-btn">INTERVIEW</button>
                        <button class="btn bg-transparent border-red-500 text-red-500 rejected-filter-btn">REJECTED</button>
                    </div>
                </div>
                <div class="card-right btn rounded-full h-8 w-8 p-0 delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
        `

        filteredSection.appendChild(div);
    }
}





