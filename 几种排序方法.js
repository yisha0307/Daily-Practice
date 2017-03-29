//1.冒泡排序
//原理：每一个数字和之后的每一个数字比较，如果前一个比后一个大就交换顺序；
//用ES6的解构赋值来交换数字；
function bubble(arr){
	for(let i = 0; i< arr.length; i++){
		for(let j = i+1; j<arr.length; j++){
			if(arr[i]>arr[j]){
				[arr[i],arr[j]] = [arr[j],arr[i]];
			}
		}
	}
	return arr;
}

//2.选择排序
//选出一个array里的最小，然后splice这个数字，push进新数组
//es6的...可以把array转化成参数序列
function selectMin(arr){
	var result = [];
	for(let i = 0; i< arr.length; i++){
		var minn = Math.min(...arr);
		result.push(minn);
		var ind = arr.indexOf(minn);
		arr.splice(ind,1);	
	}
	return result;
}

//3.插入排序
//原始新数组为[arr[0]],然后把原数组的每一个数字和resultArr的每一个数字相比较, 如果arr[i]>result[j],就塞在j+1的位置
//从resultArr的最后向前比
//塞入数字使用Array.prototype.splice()
function insertSort(arr){
	var result = [];
	result.push(arr[0]);
	tag: for(let i = 1; i<arr.length; i++){
		for(let j = result.length-1; j>=0; j--){
			if(arr[i]>result[j]){
				result.splice(j+1, 0, arr[i]);
				continue tag;
			}
		}
	}
	return result;
}
