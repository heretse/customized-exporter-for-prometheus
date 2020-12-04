const fetchStack = require('../libs/fetch-stack');

(async() => {
    let stack = await fetchStack('1ae545f8-37c4-497f-87c7-0debf49f334a', 'gAAAAABfyZo6Sq2mLZWdGjAP_1FVLSiHKCV45gXxEZWkeWV2GGTyX2qgjBKVbISEkmCf-DHYSPlvuBlNdW_x1iv498PgYj8Hlg6jS_k4NY2eQYkPQ1Xjj8mvHhBkDvwtC_Q1n-ZmDuML7MlxW9Cke9bqbrdZYpe-E1_Ohe3D2lUF7boU8UWzYWc')

    console.log(stack)
})();