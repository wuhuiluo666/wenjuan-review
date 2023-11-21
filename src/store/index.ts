import { configureStore } from '@reduxjs/toolkit'
import componentReducer, { ComponentStateProps } from './component'
import pageInfoReducer, { PageInfoProps } from './pageInfo'

export type StoreState = {
  components: ComponentStateProps
  pageInfo: PageInfoProps
}

export const store = configureStore({
  reducer: {
    components: componentReducer,
    pageInfo: pageInfoReducer
  }
})
