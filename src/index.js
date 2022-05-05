document.addEventListener("DOMContentLoaded", function() {
  
  fetchQuotes()
  formSubmitButtonFunc()

})

const quotesUrl = "http://localhost:3000/quotes?_embed=likes"
const quoteUl = document.getElementById("quote-list")

function fetchQuotes(){

  fetch(quotesUrl)
  .then(response =>  response.json())
  .then(data => {
  // console.log("data:", data)
    quoteUl.innerHTML = ""
    renderQuotes(data)

  })

}

function renderOneQuote(element){

  let quoteLi = document.createElement("li")
    quoteLi.className = `quote-card-${element.id}`
    quoteLi.id = `quote-${element.id}`

    let deleteButton = document.createElement("button")
    deleteButton.id = `deleteButton-${element.id}`
    deleteButton.className = "btn-danger"
    deleteButton.innerHTML = "Delete"
    
    let likeButton = document.createElement("button")
    likeButton.id = `likeButton-${element.id}`
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

      likeButtonFunc(element.id, quoteLi)
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

}

function renderQuotes(qouteInfo){
  // console.log(qouteInfo)
  qouteInfo.forEach(element => {
    // console.log(element.quote)
    // console.log(element.likes)
    // console.log(element.likes.length)

    renderOneQuote(element)
    
  })

}

// values of form
const newFormQuote = document.getElementById("new-quote")
const newFormAuther = document.getElementById("author")

function formSubmitButtonFunc(){
  const formSubmitButton = document.getElementById("new-quote-form")

  formSubmitButton.addEventListener("submit", function(event) {
    
    event.preventDefault()
    // console.log(event)

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
  
        // console.log('Success:', data)
        renderOneQuote(data)
      
      })
   
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

const quotesLikesUrl = "http://localhost:3000/likes"
let time = new Date()
// console.log(time.getTime())

function likeButtonFunc(quoteId, quoteLi){

  console.log(quoteId)
  console.log(quoteLi)
  // console.log(typeof quoteId)
        
  fetch(quotesLikesUrl,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"},
      body: JSON.stringify(
           {
           "quoteId": quoteId,
           "createdAt": time.getTime()
           }
      ),
    })
    .then(response => response.json())
    .then(data => {  
      // console.log('Success:', data)

      document.getElementById(`span-${quoteId}`).innerHTML++
    })

}   

