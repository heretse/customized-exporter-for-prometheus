const fetchStackList = require('../libs/fetch-stack-list');

(async() => {
    let stacks = await fetchStackList('gAAAAABf_VZUm4jTBigF4tLJqE8Y0PBSFcUyRLLqK3j6qR4p4ctxVaiJA4n4vZiTITNvzCot79e2D-ydtAwdVZV3XE03YGgJbVtfgc6f4qfJ-VtuF7lJjWiYweQWvI9uuaq0CLjnhF2Jano_WE_tynl0O2vgg39Kp7T7lTEWfNpgb9BsN4p-tPA')

    stacks.map(stack => stack.stack_name).forEach(element => console.log(element))
})();