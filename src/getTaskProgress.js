const parse = (c) => {
  switch (c) {
    case 'd': return { status: 'Dev', effort: 0.5 }
    case 'D': return { status: 'Dev', effort: 1 }
    case 'q': return {status: 'QA', effort: 0.5}
  }
}

const getTaskProgress = (input) => {
  const items = input.split('')
  return items.reduce((accumulator, current) => {
  const { status, effort } = parse(current)
  accumulator[status] = (accumulator[status] || 0) + effort
  return accumulator
  }, {})
  }

export default getTaskProgress;