export const CACHE_USER_PROFILE = 'CACHE_USER_PROFILE'
export const CACHE_PRODUCTS = 'CACHE_PRODUCTS'

export const cacheUserProfile = (username, token, roles, expiryTime) => ({
    type: CACHE_USER_PROFILE,
    username,
    token,
    roles,
    expiryTime

});

export const cacheProducts = (products) => ({
    type: CACHE_PRODUCTS,
    products

});