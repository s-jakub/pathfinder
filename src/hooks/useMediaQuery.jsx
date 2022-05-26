import { useEffect, useState } from 'react'

function useMediaQuery(props) {

    const [matches, setMatches] = useState(
        window.matchMedia(`(min-width: ${props}px)`).matches
    )

    useEffect(() => {
        window.matchMedia(`(min-width: ${props}px)`)
            .addEventListener('change', e => setMatches(e.matches) )
    }, [])

  return matches
}

export default useMediaQuery