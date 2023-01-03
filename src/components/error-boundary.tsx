import React, {ReactNode} from 'react'

//啊，好久不见，类式组件
//                                                props state
//children fallbackRender
type FallBackRender = (props:{error:Error | null}) => React.ReactElement
// export class ErrorBoundary extends React.Component<{children:ReactNode,fallbackRender:FallBackRender}, any>{
//
// }
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{fallbackRender:FallBackRender}>, {error:Error | null}>{
  state = {error:null}

  //当子组件抛出异常，这里会接受到，并且返回赋值给state
  static getDerivedStateFromError(error : Error){
    return {error}
  }
  render() {
    const {error} = this.state
    const {children,fallbackRender} = this.props
    if(error){
      return fallbackRender({error})
    }
    return children
  }
}