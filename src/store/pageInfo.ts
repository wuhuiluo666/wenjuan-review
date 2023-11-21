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
        resetPageInfo: (state: PageInfoProps, action: PayloadAction<PageInfoProps>) => {
            return action.payload
        }
    }
})

export const { resetPageInfo } = pageInfoSlice.actions
export default pageInfoSlice.reducer