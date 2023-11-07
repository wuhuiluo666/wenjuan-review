import { useKeyPress } from 'ahooks'
import { copyComp, deleteComp, pasteComp } from '../store/component'
import { useDispatch } from 'react-redux'

// 判断元素是否合法只有document.body的时候才触发
const isValidActiveElmenet = () => {
  const element = document.activeElement
  if (element === document.body) return true // 只有body才是合法的
  return false
}

export const useBindCanvans = () => {
  const dispatch = useDispatch()
  // 删除快捷键
  useKeyPress('backspace', () => {
    if (!isValidActiveElmenet()) return
    dispatch(deleteComp())
  })
  // ctrl.c复制快捷键
  useKeyPress('ctrl.c', () => {
    if(!isValidActiveElmenet()) return
    dispatch(copyComp())
  })
  // ctrl.v粘贴快捷键
  useKeyPress('ctrl.v', () => {
    if(!isValidActiveElmenet()) return
    dispatch(pasteComp())
  })
}
