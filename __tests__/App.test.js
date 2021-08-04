import {render, screen} from '@testing-library/react';
import jsonpath from 'jsonpath'

expect.extend({
  toMatchJsonPath(received, argument) {
    const result = jsonpath.query(received, argument)
    if (result.length > 0) {
      return {
        pass: true,
        message: () => 'matched'
      }
    } else {
      return {
        pass: false,
        message: () => `expected ${JSON.stringify(received)} to match
  jsonpath ${argument}`
      }
    }
  }
})

const user = {
  name: 'Juntao Qiu',
  address: 'Xian, Shaanxi, China',
  projects: [
    {name: 'ThoughtWorks University'},
    {name: 'ThoughtWorks Core Business Beach'}
  ]
}

describe("Array", () => {
  const users = ['Bob', 'Tom', 'Alex'];

  test('array containing', () => {
    const userSet = expect.arrayContaining(['Bob', 'Tom']);
    expect(users).toEqual(userSet)
  })

  test('object containing', () => {

    const matcher = expect.objectContaining({
      name: expect.stringContaining('Juntao'),
      projects: expect.arrayContaining([
        {name: expect.stringContaining('ThoughtWorks')}
      ])
    })

    expect(user).toEqual(matcher)
  })

  test('matches jsonpath', () => {
    const user = {
      name: 'Juntao'
    }
    expect(user).toMatchJsonPath('$.name')
  })
})
