import store from "./app/store.cjs";
import { ordered, restocked } from "./features/cake/cakeSlice.js";
import { ordered as icecreamOrdered, restocked as icecreamRestocked } from "./features/icecream/icecreamSlice.js";
import { fetchUsers } from "./features/user/userSlice.js";

console.log('Initial State ', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated State ', store.getState())
})

store.dispatch(fetchUsers())

