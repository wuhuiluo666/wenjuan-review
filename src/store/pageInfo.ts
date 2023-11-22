import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type PageInfoProps = {
  title: string
  desc?: string
  css?: string
  js?: string
  isPublished?: boolean
}

const initialState: PageInfoProps = {
  title: '',
  desc: '',
  css: '',
  js: '',
  isPublished: false
}

const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState,
  reducers: {
    resetPageInfo: (
      state: PageInfoProps,
      action: PayloadAction<PageInfoProps>
    ) => {
      return action.payload
    },
    // 改变问卷标题
    changeQuestionTitle: (
      draft: PageInfoProps,
      action: PayloadAction<{ newTitle: string }>
    ) => {
      const { newTitle } = action.payload
      draft.title = newTitle
    }
  }
})

export const { resetPageInfo, changeQuestionTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
