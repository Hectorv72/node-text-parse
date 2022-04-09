// const parseTextObject = (object : object) => {
//   const list = Object.entries(object)
//   list.forEach(element => {
//     const [key, value] = element
//     const texto : string = 'probando el regex {{player}} and {{player}}'
//     const replaced = texto.replaceAll(`{{${key}}}`, value)
//     console.log(replaced)
//   })
// }

const parseText = (prefix: string, value:string, text: string) => {
  return text.replaceAll(`{{${prefix}}}`, value)
}

const parseArray = (prefix: string, list: Array<string>, text: string) => {
  let parsed = text

  // const listed = list.filter((_, key) => text.includes(`{{${prefix}[${key}]}}`))
  // console.log(listed)
  list.forEach((value : string, key : number) => {
    parsed = parsed.replaceAll(`{{${prefix}[${key}]}}`, value)
  })

  return parsed
}

module.exports = (object : object, text : string) : Promise<string> => {
  return new Promise((resolve, reject) => {
    const list = Object.entries(object)

    list.forEach(element => {
      const [key, value] = element

      if (Array.isArray(value)) {
        text = parseArray(key, value, text)
      } else {
        text = parseText(key, value, text)
      }
    })

    return resolve(text)
  })
}
