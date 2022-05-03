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

  // console.log(data)

  data.forEach(element => {

    // console.log(element.quote)
    // console.log(element.likes)
    // console.log(element.likes.length)

    let quoteLi = document.createElement("li")

    quoteLi.innerHTML =  `<li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${element.quote}</p>
      <footer class="blockquote-footer">Someone famous</footer>
      <br>
      <button class='btn-success'>Likes: <span>${element.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
    </li>`
    // element.quote

    quoteUl.appendChild(quoteLi)
    
  })

  deleteButtonFunc()
  likeButtonFunc()

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

      fetch(quotesUrl)
      .then(response => response.json())
      .then(data => {

        console.log(data)

        document.getElementById("quote-list").innerHTML = ""

      })
      fetchQuotes()
      document.getElementById("new-quote-form").reset()

  })

}

let idPlaceHolder = 0

function deleteButtonFunc(){

    // delete
    let quotesDeleteButtons = document.querySelectorAll("button.btn-danger")


    quotesDeleteButtons.forEach(function(currentBtn) {
    currentBtn.addEventListener("click",function(){
  
      // Put delete button func

      console.log(currentBtn)
      // console.log(currentBtn.parentNode.parentNode.parentNode)
      // console.log(currentBtn.parentElement.parentElement.parentElement)
      // ^Any one of the 2 above .remove()

    
      idPlaceHolder = document.querySelectorAll("button.btn-danger").length
      
      
      currentBtn.parentElement.parentElement.parentElement.remove()

      console.log(idPlaceHolder)


      // `http://localhost:3000/quotes/${idPlaceHolder}/?_embed=likes`

      // "http://localhost:3000/quotes/17/?_embed=likes"
      
      // delete fetch

      fetch(`http://localhost:3000/quotes/${idPlaceHolder}/?_embed=likes`,{
      method:'DELETE'
      })
      .then(response => response.json())
      .then(data => {
     
      console.log(data)


      })      
    
    })
    
  })

}


function likeButtonFunc(){

  let quoteId = document.querySelectorAll("p.mb-0")

  for (let i = 0; i < quoteId.length; i++) {
    let item = quoteId[i]
    console.log(item)
    console.log(item.innerHTML)
    console.log(i)
    console.log(i+1)
  }

  // quoteID.forEach(function() {

  //   console.log()

  // })


  let quoteslikeButtons = document.querySelectorAll("button.btn-success")

  quoteslikeButtons.forEach(function(currentBtn) {
    currentBtn.addEventListener("click",function(){
  
      // Put delete button func

      console.log(currentBtn)

      console.log(currentBtn.parentElement)



      // `http://localhost:3000/quotes/${idPlaceHolder}/?_embed=likes`

      // "http://localhost:3000/quotes/17/?_embed=likes"
      
      // like fetch

      // fetch(`http://localhost:3000/quotes/${idPlaceHolder}/?_embed=likes`,{
      // method:'DELETE'
      // })
      // .then(response => response.json())
      // .then(data => {
     
      // console.log(data)
      // update DOM here 
      // go thru data and get the 
      // likes array for that quote
      // 0 to 1, 1 to 2


      // }) 



    })
  })
}
// addEventListener for like button

// fetch POST TO APDATE(ADDS TO ARRAY OF LIKES) LIKES WITH A USER`

// UPDATE DOM TO CURRENT LIKES

//LIKES ARRAY LENGTH


