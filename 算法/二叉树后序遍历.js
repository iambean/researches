/**
 二叉树的后续遍历 
 tree:
         1
       /  \
      2    3
     /\     \
    4  5     6
     \      /
      7    8
      
  return => [7, 4, 5, 2, 8, 6, 3, 1]
 */
const tree = {
    val: 1,
    left: {
        val: 2,
        left: { val: 4, right: {val : 7 }},
        right:{ val: 5, right: {val : 9 }}
    },
    right: {
        val: 3,
        right: {val : 6, left: {val: 8}}
    }
}

//递归版
const treeWalker1 = function _walk(node) {
    let result = []
    if(node.left){
        result.push(_walk(node.left))
    }
    if(node.right){
        result.push(_walk(node.right))
    }
    result.push(node.val)
    return result.flat()
}
// console.log('二叉树的后续遍历【递归版】：\r\n', treeWalker1(tree))

// 非递归版
const treeWalker2 = (node) => {
    let leftNodes = [node]
    while(leftNodes.length>0){
        let curr = leftNodes.pop()
    }
}
// console.log('二叉树的后续遍历【非递归版】：\r\n', treeWalker1(tree))