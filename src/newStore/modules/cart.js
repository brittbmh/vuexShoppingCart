import shop from "@/api/shop";

export default {
    namespaced: true,
    state: {
        items: [],
        checkoutStatus: null
    },
    getters: {
        cartProducts(state, getters, rootState, rootGetters) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters) {
            let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total
        }
    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },
        emptyCart(state) {
            state.items = []
        }
    },
    actions: {
        checkout({ state, commit, root }) {
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        },
        addProductToCart({ getters, state, commit, rootState, rootGetters, }, product) {
            if (rootGetters['products/productIsInStock'](product)) {
                const cartItem = state.items.find(item => item.id === product.id)
                if (!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root: true})
            }
        }
    }
}