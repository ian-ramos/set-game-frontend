const rawCardsArray = []
for (let j=0; j<3; j++){
  let color
  switch(j){
    case 0:
      color= 'green'
      break;
    case 1:
      color= 'red'
      break;
    case 2:
      color= 'purple'
      break;
    default:
      color = 'not gonna happen'
    }
  for(let k=0;k<3;k++){
    let shape
    switch(k){
      case 0:
        shape = 'cylinder'
        break;
      case 1:
        shape = 'diamond'
        break;
      case 2:
        shape = 'squiggly'
        break;
      default:
        shape = 'not gonna happen'
      }
    for(let l=0;l<3;l++){
      let fill
      switch(l){
        case 0:
          fill = 'empty'
          break;
        case 1:
          fill = 'full'
          break;
        case 2:
          fill = 'half'
          break;
        default:
          fill = 'not gonna happen'
        }

      for(let m =0; m < 3; m++){
        rawCardsArray.push([color,shape,fill,m+1])
      }
    }
  }
}

const cardsArray = rawCardsArray.map(array => {
  return {color: array[0], shape: array[1], fill:array[2], count:array[3], clicked: false}
})

export {cardsArray}
