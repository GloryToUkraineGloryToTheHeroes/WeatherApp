const React = require('react')

export const useMessage = () => {
    return React.useCallback( text => {
        if(window.M && text){
            window.M.toast({html: text})
        }
    }, [])
}




