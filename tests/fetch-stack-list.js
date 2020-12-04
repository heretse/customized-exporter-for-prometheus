var fetchStackList = require('../libs/fetch-stack-list');

(async() => {
    let stacks = await fetchStackList('gAAAAABfyMb8RJdSIVO-j3sj9cnwa7wljbZgS-KB9lJppof4zIZwNaA2FL35DDh9S7qWQsUjZBdIPdvQh4uSz5vibWFMmCu_STtR9CqR-BoV5QvB3X9qNGBMY-PSTPWYZKPM76iWWD533Yu1lIV4VEkkBH5G0rgVsTox1D_xV7jkYETx0pn4h5w')

    stacks.map(stack => stack.stack_name).forEach(element => console.log(element))
})();