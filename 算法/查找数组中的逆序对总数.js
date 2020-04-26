
/**
from leetcode : https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。 

示例 1:

输入: [7,5,6,4]
输出: 5

限制：

0 <= 数组长度 <= 50000
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    // 做简单的由小到大的冒泡排序，过程中的交换次数即要求的逆序对。
    let counter = 0
    while(nums.length > 1){
        console.log('start:', nums)
        for(let i = 0, len = nums.length - 1; i< len; i++){
            if(nums[i] > nums[i+1]){
                //swap
                var temp = nums[i]
                nums[i] = nums[i+1]
                nums[i+1] = temp
                //
                counter++
            }
        }
        console.log('end:',nums, '\r\n')
        nums.pop()
    }
    return counter
};


console.log(reversePairs([7,5,6,4]))
