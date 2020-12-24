import { useEffect, useState } from "react"

const useWidth = () => {

    const [widthScreen, setWidthScreen] = useState(window.innerWidth)

    useEffect(()=> {
      const handleResize= () => setWidthScreen(window.innerWidth)
      window.addEventListener('resize', handleResize)//changes in window.innerWidth

      return () => {
        window.removeEventListener('resize',handleResize)
        // console.log(widthScreen)
      }
    },[widthScreen])

    const isMobileDevice = widthScreen < 768
    const isSmallDevice = widthScreen < 576
    const isMediumDevice = widthScreen >= 768
    const isPersDevice =widthScreen< 700

    return {isMobileDevice,isSmallDevice,isMediumDevice,isPersDevice}
}

export  default useWidth