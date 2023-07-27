type Message = string | object | unknown

// a function to log error messages so that we avoid using console.log directly and get too many eslint errors
export function logError(message: Message) {
  // eslint-disable-next-line no-console
  console.error(message)
}
