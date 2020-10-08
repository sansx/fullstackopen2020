import {
  useState
} from 'react'

export const useField = (type='text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return [{
    type,
    value,
    onChange
  }, reset]
}