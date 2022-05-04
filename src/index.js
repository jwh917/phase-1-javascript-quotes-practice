document.addEventListener("DOMContentLoaded", function() {
  
  fetchQuotes()
  formSubmitButtonFunc()

})

const quotesUrl = "http://localhost:3000/quotes?_embed=likes"

const quoteUl = document.getElementById("quote-list")

function fetchQuotes(){

  fetch(quotesUrl)
  .then(response => response.json())
  .then(data => {
  // console.log("data:", data)
    document.getElementById("quote-list").innerHTML = ""

    renderQuotes(data)

  })

}

function renderQuotes(qouteInfo){

  qouteInfo.forEach(element => {

    // console.log(element.quote)
    // console.log(element.likes)
    // console.log(element.likes.length)

    let quoteLi = document.createElement("li")
    quoteLi.className = "quote-card"

    let deleteButton = document.createElement("button")
    deleteButton.id = `deleteButton-${element.id}`
    deleteButton.className = "btn-danger"
    deleteButton.innerHTML = "Delete"
    
    let likeButton = document.createElement("button")
    likeButton.id = element.id
    likeButton.className = "btn-success"
    likeButton.innerHTML = "Like: "
    let likeButtonSpan = document.createElement("span")
    likeButtonSpan.id = `span-${element.id}`
    likeButtonSpan.innerHTML = element.likes.length
    likeButton.appendChild(likeButtonSpan)

    //pass in deleteButtonFunc and likeButtonFunc

    deleteButton.addEventListener("click", () => {

      deleteButtonFunc(element.id, quoteLi)
    })

    likeButton.addEventListener("click", () => {

      likeButtonFunc(element.id)
    })

    quoteLi.innerHTML =  
    `<blockquote class="blockquote">
      <p class="mb-0">${element.quote}</p>
      <footer class="blockquote-footer">Someone famous</footer>
      <br>
    </blockquote>
    `
  
    quoteLi.appendChild(deleteButton)
    quoteLi.appendChild(likeButton)
  
    quoteUl.appendChild(quoteLi)
    
  })

}


// values of form
const newFormQuote = document.getElementById("new-quote")
const newFormAuther = document.getElementById("author")

function formSubmitButtonFunc(){
  const formSubmitButton = document.getElementById("new-quote-form")

  formSubmitButton.addEventListener("submit", function(event) {
    
    event.preventDefault()
    console.log(event)

    fetch(quotesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"},
        body: JSON.stringify({
          
          "quote": newFormQuote.value,
          "auther": newFormAuther.value,
          "likes": []
  
        }),
      })
      .then(response => response.json())
      .then(data => {
  
        console.log('Success:', data)
      
      })

      // fetch(quotesUrl)
      // .then(response => response.json())
      // .then(data => {

      //   console.log(data)

      //   // document.getElementById("quote-list").innerHTML = ""
      // })
      fetchQuotes()
      formSubmitButton.reset()
  })

}


function deleteButtonFunc(quoteId, quoteLi){
  
  console.log(quoteId, quoteLi)

  quoteLi.remove()

  fetch(`http://localhost:3000/quotes/${quoteId}/?_embed=likes`,{
    method:'DELETE'
    })
    .then(response => response.json())
    .then(data => {
     
    console.log(data)


    })   
    
}

let numHolder = 0

function renderLikes(quoteId){
  console.log(quoteId)
  // go thru every span set the innerHTML = ""
  // 2nd fetch GET - getting the element.likes.length
  // set all spans innerHTML = likes array length
  fetch(quotesUrl)
    .then(response => response.json())
    .then(data => {
    // console.log("data:", data)
  
    data.forEach(element => {
      console.log(element)
      // console.log(element.id)
      // console.log(element.quote)
      // console.log(element.likes)
      // console.log(element.likes.length)
      if(quoteId === element.id){
        console.log("GO")
        numHolder = element.likes.length
      }

    })
    console.log(numHolder)
    document.getElementById(`span-${quoteId}`).innerHTML = numHolder

    })
  
  
  }

const quotesLikesUrl = "http://localhost:3000/likes"


function likeButtonFunc(quoteId){

  console.log(quoteId)
  console.log(typeof quoteId)
        
  fetch(quotesLikesUrl,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"},
      body: JSON.stringify(
           {
           "quoteId": quoteId,
           "createdAt": 1558524360
           }   
      ),
    })
    .then(response => response.json())
    .then(data => {
  
      console.log('Success:', data)

      document.getElementById(`span-${quoteId}`).innerHTML = ""

    })

    // fetchQuotes()
    renderLikes(quoteId)

}   
      // like fetch

      // update DOM here 
      // go thru data and get the 
      // likes array for that quote
      // innerHTML = likes array length
      // 0 to 1, 1 to 2


// addEventListener for like button

// fetch POST TO APDATE(ADDS TO ARRAY OF LIKES) LIKES WITH A USER`

// UPDATE DOM TO CURRENT LIKES

//LIKES ARRAY LENGTH


