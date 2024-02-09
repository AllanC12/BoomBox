
const getMusic = async (endPoint: string) => {
  const resp = await fetch(endPoint).then(resp => resp.json())
  

// const constructLayout = (listMusic: )

console.log(getMusic('https://api.deezer.com/chart/0'))

}