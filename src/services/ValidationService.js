module.exports = app => {
    /**
     * Verifica se existe o valor passado esta correto 
     * @param {Valor que sera tratado} value 
     * @param {Mensagem que será retornada ao usuário} msg 
     */
    function existsOrError(value,msg){
        if(!value) throw msg
        if(Array.isArray(value) && value.length === 0) throw msg
        if(typeof value === 'string' && !value.trim()) throw msg
    }

    /**
     * Verifica se não existe nenhum erro
     * @param {Valo que sera validado} value 
     * @param {Mensagem caso existir erro} msg 
     */
    function notExistsOrError(value,msg){
        try{
            existsOrError(value,msg)
        }catch(e){
            return
        }
        throw msg
    }

    /**
     * Verifica se os dois objetos ou valores
     * são diferentes.
     * @param {Objeto} valueA 
     * @param {Objeto} valueB 
     * @param {Mensagem retornada ao usuario} msg 
     */
    function equalsOrError(valueA,valueB,msg){
        if(valueA !== valueB) throw msg
    }

    /**
     * Retorna as funções 
     */
    return{existsOrError,notExistsOrError,equalsOrError}
}