const choices = document.querySelectorAll('#clickMe')
choices.forEach(choice=> choice.addEventListener('click', makeReq) )

async function makeReq(e){
  const userChoice = e.target.textContent
  console.log(userChoice)
  const res = await fetch(`/api?choice=${userChoice}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#result").textContent = `Result: you ${data.result}!`


}

