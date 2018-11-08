

module.exports = {
handleChange: (prop, value) => {
   if(typeof value !== 'String' && typeof [prop] !== 'String'){
        throw new error('value and prop both require a String')
   } 
}
}

