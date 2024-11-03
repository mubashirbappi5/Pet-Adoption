

// see view btn
document.getElementById('see-btn').addEventListener('click',function(e){
    const BestFriendSection = document.getElementById("main-best-section")
    BestFriendSection.scrollIntoView()
})

// load btn on categories
const loadCategoriesBtn =(id) =>{
   
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => { displayAllpet(data.data)
        const activeBtn = document.getElementById(`btn-${id}`)
        removeBtn()
        activeBtn.classList.add("text-btnColour","border-btnColour","rounded-full")
        

    })
    .catch((err) => console.log(err))
}
// removebtn
const removeBtn =() =>{
    const activBtn = document.getElementsByClassName("btndactive")
    for(btn of activBtn){
        btn.classList.remove("text-btnColour","border-btnColour","rounded-full")
    }
}

// Categories
const loadCategories = async() => {
   try{
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/categories")
    const data = await res.json()
    displayCategories(data.categories)
   }
   catch(err){
    console.log("ERROR:",err)
   }
}
// display categories
const displayCategories = (categories) => {
   
    const categoriesSection = document.getElementById("Categories")
    categories.forEach(categoriData =>{
        
        
        const categoriesDiv = document.createElement("button")
        categoriesDiv.innerHTML = `
                        <button id="btn-${categoriData.category}" onclick="loadingData()" class=" mx-auto border btndactive  px-7 py-2 hover:bg-slate-300 flex justify-center items-center  gap-4">
                        <img src="${categoriData.category_icon}" alt="animal">
                        <h3 class="text-2xl font-bold">${categoriData.category}</h3>
                        </button>
        `
        categoriesDiv.addEventListener('click', () => loadCategoriesBtn(categoriData.category));
        categoriesSection.append(categoriesDiv)
    })
   
}
// Details btn popup
const loadDetails = async(detailsId) =>{
   
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`)
        const data = await res.json()
         displayDetails(data.petData)
    }
    catch(err){
        console.log("ERROR:",err)
       }
    
}
// display details
const displayDetails = (petData)=>{
    
    document.getElementById("showModalData").click()
    const modalContainer = document.getElementById("modal-cotainer")
    modalContainer.innerHTML =`
   <img class=" w-full" src="${petData.image}">
     <h2 class="card-title text-lg md:text-2xl font-bold my-3">${petData.pet_name}</h2>
     <div class="grid grid-cols-2 text-sm">
       ${petData.breed == undefined? ` <p class="flex gap-1 "><img width="18" height="18" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/>  Breed:Not Available</p>`: `<p class="flex gap-1 "><img width="18" height="18" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/>  Breed:${petData.breed}</p>`}

        ${petData.date_of_birth ===null || petData.date_of_birth===undefined?`<p class=""><i class="fa-regular fa-calendar"></i> Birth:Not Available</p>` :`<p class=""><i class="fa-regular fa-calendar"></i>  Birth:${petData.date_of_birth}</p>`}

        ${petData.gender ==null?`<p> <i class="fa-solid fa-mercury"></i>  Gender: Not Available</p>`: `<p class:""><i class="fa-solid fa-mercury"></i>  Gender:${petData.gender}</p>`}


         ${petData.price ==  undefined ? `<p><i class="fa-solid fa-dollar-sign"></i>Price:Not Available</p>` :` <p class:""><i class="fa-solid fa-dollar-sign"></i>  Price:${petData.price}</p>`}


         ${petData.vaccinated_status ==null?`<p> <i class="fa-solid fa-mercury"></i>  Gender: Not Available</p>`: `<p class:""><i class="fa-solid fa-mercury"></i> vaccinated_status:${petData.vaccinated_status}</p>`}
        </div>
        <div class="divider"></div>
        <h3 class="text-lg font-bold">Details Information</h3>
        <p class="text-sm">${petData.pet_details}</p>
         



    
    
    
    `
    
    
}

// load image right side
const loadimage = async(detailsId) =>{
    
   try{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`)
    const data = await res.json()
    thumbnailImage(data.petData)
   }
   catch(err){
    console.log("ERROR:",err)
   }
    
}
// right side add image
const  thumbnailImage = (petData) =>{
    console.log(petData)
    const rightSideSection = document.getElementById("rightside-section")
    
     const imageDiv = document.createElement('div')
     imageDiv.classList.add("rounded-lg")
     imageDiv.innerHTML=`
         <img class="rounded-lg" src="${petData.image}">
     `

     rightSideSection.append(imageDiv)

}
// countdown modal

const startModal = () =>{
    let count = 3
     document.getElementById("my_modal_4").showModal()
     document.getElementById("countdown-btn").innerText = count;
     
      let timer =setInterval( () =>{
       
        --count; 
        document.getElementById("countdown-btn").innerText = count;
    if(count <=0){
        clearInterval(timer)
        document.getElementById("stop-modal").click()
    }
},1000)
count=3

}


// loading

const loadingCard = () =>{
   
    document.getElementById("loading").style.display = "none"
}
const loadingData = () =>{
   
    const petCard = document.getElementById("pet-card")
    petCard.classList.add("hidden")
    petCard.classList.remove("md:grid")
    const spinner = document.getElementById("loading")
    spinner.style.display = "block"
    setTimeout(() => {
        
        spinner.style.display = "none";
        petCard.classList.add("md:grid")
        petCard.classList.remove("hidden")
        
    }, 1000); 
;
    

}



// all pet
const loadAllpet = async() =>{
   try{
    const res = await fetch("https://openapi.programming-hero.com/api/peddy/pets")
    const data = await res.json()
    displayAllpet(data.pets)
   }
   catch(err){
    console.log("ERROR:",err)
   }
}

// display all pet
const displayAllpet  = (pets) => {
    const petCardall = document.getElementById("pet-card")
    
    petCardall.innerHTML =""
    if(pets.length == 0){
        
         petCardall.innerHTML =`<div class="h-screen flex flex-col justify-center items-center gap-5 col-span-9">
         <img src="./images/error.webp">
         <h1 class="text-center font-bold text-2xl">No Information Available</h1>
         <p class="text-center text-dark2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
         </div>`
         return

    }
    document.getElementById("sortBtn").addEventListener("click", () => {
        pets.sort((x, y) => {
            if (x.price === undefined) return 1; 
            if (y.price === undefined) return -1;
            return y.price - x.price;
        });
        shortpet(pets)

    });
    
     
 const shortpet = (sortedpet) =>{
    petCardall.innerHTML =""
    
    sortedpet.forEach(pet =>{
       
            
        
       
        const card = document.createElement('div')
        card.classList.add("card","bg-base-100","border") 
        card.innerHTML = `
         <figure class="px-4 pt-4">
                    <img
                      src="${pet.image}"
                      alt="pets"
                      class="rounded-xl" />
                  </figure>
                  <div class="card-body ">
                    <h2 class="card-title">${pet.pet_name}</h2>

                   ${pet.breed == undefined? ` <p class="flex gap-1 "><img width="18" height="18" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/>  Breed:Not Available</p>`: `<p class="flex gap-1 "><img width="18" height="18" src="https://img.icons8.com/material-outlined/24/health-data.png" alt="health-data"/>  Breed:${pet.breed}</p>`}

                    ${pet.date_of_birth ===null || pet.date_of_birth===undefined? `<p class=""><i class="fa-regular fa-calendar"></i> Birth:Not Available</p>` :`<p class=""><i class="fa-regular fa-calendar"></i>  Birth:${pet.date_of_birth}</p>
`
                }
                   ${pet.gender ==null?`<p> <i class="fa-solid fa-mercury"></i>  Gender: Not Available</p>`: `<p class:""><i class="fa-solid fa-mercury"></i>  Gender:${pet.gender}</p>`}

                   ${pet.price ==  undefined ? `<p><i class="fa-solid fa-dollar-sign"></i>Price:Not Available</p>` :` <p class:""><i class="fa-solid fa-dollar-sign"></i>  Price:${pet.price}</p>`}

                    <div class="flex flex-wrap md:flex-nowrap  gap-2 lg:gap-4">
                      <button onclick="loadimage('${pet.petId}')" class="btn  btn-outline"><i class="fa-regular fa-thumbs-up"></i></button>
                      <button onclick="startModal()" class="btn btn-outline text-btnColour ">Adopt</button>
                      <button onclick="loadDetails('${pet.petId}')" class="btn btn-outline text-btnColour ">Details</button>
                    </div>
                  </div>
        
        
        `

        

        petCardall.append(card)

    })

}
shortpet(pets)


}





loadCategories()
loadAllpet()
loadingData()