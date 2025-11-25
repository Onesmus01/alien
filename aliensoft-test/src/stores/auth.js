import { defineStore } from 'pinia'

// ✅ Dummy users for testing
const dummyUsers = [
  { id: 1, username: "john_doe", email: "john@example.com", password: "1234", fullName: "John Doe" },
  { id: 2, username: "jane_smith", email: "jane@example.com", password: "abcd", fullName: "Jane Smith" }
]

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    // Login with dummy users
    async login({ username, password }) {
      // simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))

      const foundUser = dummyUsers.find(
        u => (u.username === username || u.email === username) && u.password === password
      )

      if (!foundUser) throw new Error('Invalid credentials')

      const token = `dummy-token-${foundUser.id}`

      this.token = token
      this.user = { id: foundUser.id, username: foundUser.username, fullName: foundUser.fullName }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(this.user))

      return true
    },

    // Logout user
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Optional: refresh page to reset protected routes
      // location.reload()
    },

    // Restore session from localStorage
    restoreSession() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      this.token = token || null
      this.user = user ? JSON.parse(user) : null
    }
  }
})
