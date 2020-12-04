var fetchStack = require('../libs/fetch-stack');

(async() => {
    let stack = await fetchStack('admin', '1ae545f8-37c4-497f-87c7-0debf49f334a', 'gAAAAABfyMb8RJdSIVO-j3sj9cnwa7wljbZgS-KB9lJppof4zIZwNaA2FL35DDh9S7qWQsUjZBdIPdvQh4uSz5vibWFMmCu_STtR9CqR-BoV5QvB3X9qNGBMY-PSTPWYZKPM76iWWD533Yu1lIV4VEkkBH5G0rgVsTox1D_xV7jkYETx0pn4h5w')

    console.log(stack)
})();