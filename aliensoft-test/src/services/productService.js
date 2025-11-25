// Handles all API calls related to products
export const fetchProductsAPI = async (token) => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=100', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error('Failed to fetch products')
    const data = await res.json()
    return data.products
  } catch (err) {
    throw err
  }
}

export const fetchProductByIdAPI = async (id, token) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error('Failed to fetch product')
    return await res.json()
  } catch (err) {
    throw err
  }
}

export const addProductAPI = async (product, token) => {
  try {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error('Failed to add product')
    return await res.json()
  } catch (err) {
    throw err
  }
}

// Optional: update and delete can be added later
