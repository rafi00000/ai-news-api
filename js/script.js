const loadData = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const rec = await res.json();
    const data = rec.data.tools;
    dataDisplay(data);
};

const dataDisplay = (data) => {
    const cardContainer = document.getElementById('card-container');
    data.forEach(element => {
        console.log(element);

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card shadow-2xl">
                    <figure class="p-5 h-64"><img src="${element.image}" alt="" class='rounded-2xl my-auto'/></figure>
                    <div class="p-5 space-y-5">
                        <h2 class="text-2xl font-bold">Features: </h2>
                        <div>
                            <p>1. Natural language processing</p>
                            <p>2. Text generation </p>
                            <p>3. Contextual understanding</p>
                        <div>
                        <br>
                        <hr>
                        <br>
                        <div class="card-actions justify-between">
                            <div>
                                <h2 class="text-lg font-bold">${element.name}</h2>
                                <p>Date: <span>11/10/2021</span></p>
                            </div>
                            <div>
                                <button onclick="handleShowDetails('${element.id}')" class="text-white font-mono font-extrabold bg-red-500 p-3 rounded-full">--></button>
                            </div>
                        </div>
                    </div>
                </div>
        ` ;
        cardContainer.appendChild(div);
    });
};

const handleShowDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const detail = data.data;
    showDetail(detail);
    show_detail_modal.showModal();

}

const showDetail = (data) =>{
    // console.log(data);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <dialog id="show_detail_modal" class="modal">
    <form method="dialog" class="modal-box w-11/12 max-w-4xl max-h-screen flex flex-col-reverse lg:flex-row gap-3 lg:gap-8">
        <!-- right side -->
        <div class="shadow-2xl border p-5 rounded-lg space-y-4">
            <h3 class="text-xl font-bold text-center">${data.description}</h3>
            <div class="flex flex-col lg:flex-row gap-3 items-center justify-center">
                <p class="bg-white p-2 rounded-lg text-center shadow-xl text-green-500">${data.pricing[0].plan} <br> <span>${data.pricing[0].price}</span></p>
                <p class="bg-white p-2 rounded-lg text-center shadow-xl text-orange-500">${data.pricing[1].plan} <br> <span>${data.pricing[1].price}</span></p>
                <p class="shadow-xl bg-white p-2 rounded-lg text-center text-red-500">${data.pricing[2].plan} <br> <span>${data.pricing[2].price}</span></p>
            </div>
            <div class="flex flex-col lg:flex-row justify-between">
                <div id='feature-list'>
                    <h1 class="text-2xl font-bold">Features</h1>
                    <br>
                </div>
                <div id='integration-list'>
                    <h1 class="text-2xl font-bold">Integrations</h1>
                    <br>
                   <!-- ----------------------------------------------------- -->
                </div>
            </div>

        </div>

        <!-- right side -->
        <div class="space-y-5 border shadow-2xl p-4 rounded-xl">
            <figure>
                <img src="${data.image_link[0] ? data.image_link[0] : data.image_link[1]}" class='rounded-xl' alt="">
            </figure>
            <h3 class="text-2xl font-bold">Hi, how are you doing today?</h3>
            <p>I'm doing well, thank you for asking. How can I assist you today?</p>
        </div>

    </form>


    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
    ` ;

    integrationListHandler(data);
    featureListHandler(data.features)
};

const integrationListHandler = (data) => {
    const listContainer =  document.getElementById('integration-list');
    const integrationListItem = data.integrations;
    integrationListItem.forEach(insideItem => {
        const li = document.createElement('li');
        li.innerText = insideItem;
        listContainer.appendChild(li);
    })
};

const featureListHandler = (data) => {
    const featureListContainer = document.getElementById('feature-list');
    console.log(data);
    // for(const value in data){
    //     console.log(value);
    //     const li = document.createElement('li');
    //         li.innerText = value;
    //     featureListContainer.appendChild(li);
    // }
};


loadData();