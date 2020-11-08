import React, { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext()
const DispatchContext = createContext()

const mainReducer = (state, action) => {
    switch (action.type) {

        case "addNewCapital":
            return {
                ...state,
                capitalList: [action.payload, ...state.capitalList]
            }
        case "selectCapital":
            return {
                ...state,
                selectedCapital: action.payload.capital
            }
        case "deleteCapital":
            return {
                ...state,
                capitalList: state.capitalList.filter(cp => cp.name !== action.payload.name)
            }
        case "deleteSelectedCapital":
            return {
                ...state,
                selectedCapital: null,
                capitalList: state.capitalList.filter(cp => cp.name !== action.payload.name)
            }
        default:
            return state
    }
}

const initialStore = {
    capitalList: [],
    loadingSelectedCapital: false
}


function MainContext({ children }) {

    const [store, dispatch] = useReducer(mainReducer, initialStore)

    return (
        <StoreContext.Provider value={store}>
            <DispatchContext.Provider value={dispatch} >
                {children}
            </DispatchContext.Provider>
        </StoreContext.Provider>
    )
}

export default MainContext

export const useStore = () => useContext(StoreContext)
export const useDispatch = () => useContext(DispatchContext)
