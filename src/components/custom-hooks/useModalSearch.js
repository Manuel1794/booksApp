import { useState } from 'react'

const useModalSearch = () => {

    const [modalResults, setModalResults] = useState(false)

    return { modalResults , setModalResults}
}

export default useModalSearch
