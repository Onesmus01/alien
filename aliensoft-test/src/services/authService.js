// Handles API calls for auth
export const loginUser = async ({ username, password }) => {
  try {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error('Invalid credentials')
    const data = await res.json()
    return data
  } catch (err) {
    throw err
  }
}
