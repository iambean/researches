
/*
    1
   / \
  2   3
 / \   \
4   5   6
    /
   7
前序遍历：=> [1245736]
中序遍历：=> [4275136]
后续遍历：=> [4752631]
*/
const tree = {
    val: 1,
    left:{
        val: 2,
        left: {val: 4},
        right: {
            val: 5,
            left: {val: 7}
        }
    },
    right: {
        val: 3,
        right: {val: 6}
    }
}

function isLeefNode (node) {
    return !('left' in node) && !('right' in node)
}

/*-----------------------------------前序-------------------------------------*/
function treeWalkerWithFirst(tree){
    const stack = [tree]
    const res = []
    while(stack.length > 0){
        // console.log(stack, res, '\r\n============\r\n')
        let node = stack[stack.length - 1]
        if(node._readed || isLeefNode(node)){
            stack.pop(0)
            res.unshift(node.val)
        }else{
            if(node.left){
                stack.push(node.left)
            }
            if(node.right){
                stack.push(node.right)
            }
            node._readed = true
        }
    }
    return res
}
/*-----------------------------------中序-------------------------------------*/
/**
[1(f)]
[2(f), 1(T), 3(f)],   []
[4(f), 2(T), 5(f), 1(T), 3(f)],  []
[2(T), 5(f), 1(T), 3(f)], [4(leef)]
[5(f), 1(T), 3(f)],[4(leef),2(T)]
[7(f), 5(T), 1(T), 3(f)], [4(leef), 2(T)]
[3(f)], [4(leef), 2(T), 7(leef), 5(T), 1(T)]
[3(T), 6(f)], [4,2,7,5,1]
[4,2,7,5,1,3,6]

 */
function treeWalkerWithMiddle(tree){
    const stack = [tree]
    const res = []
    while(stack.length > 0){
        // console.log(stack, res, '\r\n============\r\n')
        let node = stack[0]
        if(node._readed || isLeefNode(node)){
            stack.shift(0)
            res.push(node.val)
        }else{
            if(node.right){
                stack.splice(1, 0, node.right)
            }
            // because use splice to insert right child node on index(1), so splice must first.
            if(node.left){
                stack.unshift(node.left)
            }
            node._readed = true
        }
    }
    return res
}

/*-----------------------------------后序-------------------------------------*/
function treeWalkerWithLast (tree){
    let stack = [tree]
    let res = []
    while(stack.length > 0){
        console.log(stack, res, '\r\n============\r\n')
        let node = stack[0]
        if(node._readed || isLeefNode(node)){
            res.push(node.val)
            stack.shift(0)
        }else{
            if(node.right){
                stack.unshift(node.right)
            }
            if(node.left){
                stack.unshift(node.left)
            }
            node._readed = true
        }
    }
    return res
}


///////////////////////////////////////////////////////////////////////////////////////////////
// console.log('前序遍历：', treeWalkerWithFirst(tree)) // [1, 2, 4, 5, 7, 3, 6]
// console.log('中序遍历：', treeWalkerWithMiddle(tree)) // [4, 2, 7, 5, 1, 3, 6]
// console.log('后序遍历：', treeWalkerWithLast(tree)); // [4,7,5,2,6,3,1]
