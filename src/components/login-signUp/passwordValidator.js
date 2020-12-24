const verifyPassword = async (password) =>{

    const upperCase =(password) =>{
        const patron = /^(?=.*[A-Z])/;
        return password.match(patron);       
    }

    const specialChar = (password)=>{
        const patron = /^(?=.*[!@#-$&._*%])/
        return password.match(patron)
    }

    const containNumber = (password) => {
        const patron = /^(?=.*[0-9])/
        return password.match(patron)
    }

    const lowerCase = (password) => {
        const patron = /^(?=.*[a-z])/
        return password.match(patron)
    }

    const blankSpace=(password)=>{
        const patron = /\s/
        return password.match(patron)
    }

    if(!upperCase(password)){
        return 'la contraseña debe contener una letra mayúscula'
    }

    if (!containNumber(password)){
        return 'la contraseña debe contener un número'
    }

    if(!specialChar(password)){
        return 'la contraseña debe contener un carácter especial'
    }
    
    if (!lowerCase(password)){
        return 'la contraseña debe contener una letra minúscula'
    }

    if(blankSpace(password)) {
        return 'la contraseña no debe contener espacios en blanco'
    }

    return 'success'
}

export default verifyPassword


