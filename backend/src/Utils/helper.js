

module.exports = {
    removeSpecialCharacter(str){

        return str.replace(/[^0-9 ]/g, "");
    },

    fixCpfStr(str){
        return str.replace('0000', '000')
    }
    
}