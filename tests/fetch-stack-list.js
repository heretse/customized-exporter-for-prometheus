const fetchStackList = require('../libs/fetch-stack-list');

(async() => {
    let stacks = await fetchStackList('gAAAAABfyZo6Sq2mLZWdGjAP_1FVLSiHKCV45gXxEZWkeWV2GGTyX2qgjBKVbISEkmCf-DHYSPlvuBlNdW_x1iv498PgYj8Hlg6jS_k4NY2eQYkPQ1Xjj8mvHhBkDvwtC_Q1n-ZmDuML7MlxW9Cke9bqbrdZYpe-E1_Ohe3D2lUF7boU8UWzYWc')

    stacks.map(stack => stack.stack_name).forEach(element => console.log(element))
})();