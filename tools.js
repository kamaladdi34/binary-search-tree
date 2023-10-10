function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  let firstArray = [...array].splice(0, array.length / 2);
  let secondArray = [...array].splice(array.length / 2, array.length);
  let firstArrayResult = mergeSort(firstArray);
  let secondArrayResult = mergeSort(secondArray);
  let result = [];
  let i = 0,
    j = 0;
  while (
    i <= firstArrayResult.length - 1 &&
    j <= secondArrayResult.length - 1
  ) {
    if (firstArrayResult[i] < secondArrayResult[j]) {
      result.push(firstArrayResult[i]);
      i++;
    } else {
      result.push(secondArrayResult[j]);
      j++;
    }
  }
  if (i < firstArrayResult.length) {
    result = result.concat(firstArrayResult.slice(i));
  }
  if (j < secondArrayResult.length) {
    result = result.concat(secondArrayResult.slice(j));
  }
  return result;
}
function removeDuplicates(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!newArray.includes(array[i])) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
export function cleanArray(array) {
  return removeDuplicates(mergeSort(array));
}
