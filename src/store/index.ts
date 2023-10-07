import { configureStore } from '@reduxjs/toolkit'
import componentReducer, { ComponentStateProps } from './component'

export type StoreState = {
  components: ComponentStateProps
}

export const store = configureStore({
  reducer: {
    components: componentReducer
  }
})
