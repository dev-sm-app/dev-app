

module.exports = {
Page: (prevStatePage) => {
   if(typeof prevStatePage !== 'number'){
        throw new Error('page needs to be a number');
        }
   
   return prevStatePage + 1;
    },
    totalPage: (prevStateTotalPage) => {
        if(typeof prevStateTotalPage !== 'number'){
            throw new Error('totalPage to be a number')
        }
        return prevStateTotalPage + 1
    }
}



