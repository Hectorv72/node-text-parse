const parseTags = require('./parseTags')
const parseValues = require('./parseValues')

const parseEntry = async (item : {values: object, tags: object }) => {
  const text = 'probando texto de la historia [[danger]]{{player[0]}}[[danger]] y {{player[1]}} enfrentandose a {{enemy}}'
  const values = item.values
  const tags = item.tags

  console.log('')
  console.log('texto sin formato => ', text + '\n')

  const parsed_values = await parseValues(values, text)
  console.log('texto con valores => ', parsed_values + '\n')
  const parsed_tags = await parseTags(tags, parsed_values)
  console.log('texto con valores y tags => ', parsed_tags)
}

const prop = {
  values: {
    player: ['Hector', 'Daniel', 'Valdez'],
    enemy: 'Goku'
  },
  tags: {
    danger: ['<span class="text-danger">', '</span>']
  }
}

parseEntry(prop)
