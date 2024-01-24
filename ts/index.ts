function getUser(url: string):void{
  const user = fetch(url)
  console.log(user)
}

getUser("http://localhost:3000/users")