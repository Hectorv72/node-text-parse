module.exports = (object : object, text : string) : Promise<string> => {
  return new Promise((resolve, reject) => {
    const list = Object.entries(object)

    list.forEach(element => {
      const [prefix, tag] = element
      const [open, close] = tag

      const first_phase = text.replaceAll(`[[${prefix}]]`, `|^[[${prefix}]]|^`)
      const splitted = first_phase.split('|^')

      let opened = false

      const mapped = splitted.map(text => {
        if (text === `[[${prefix}]]`) {
          const value = !opened
            ? open
            : close
          opened = !opened
          return value
        }
        return text
      })

      text = mapped.join('')
    })

    return resolve(text)
  })
}
