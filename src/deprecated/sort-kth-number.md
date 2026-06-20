---
title: "K번째 수"
date: "2026-02-26 11:30"
desc: "프로그래머스 알고리즘 고득점 kit 정렬"
tags: ["#algorithms","#codingtest","#sort", "#CS"]
thumbnail: "/cs.svg"
---
**문제 설명**
배열 array의 i번째 숫자부터 j번째 숫자까지 자르고 정렬했을 때, k번째에 있는 수를 구하려 합니다.

예를 들어 array가 [1, 5, 2, 6, 3, 7, 4], i = 2, j = 5, k = 3이라면

array의 2번째부터 5번째까지 자르면 [5, 2, 6, 3]입니다.
1에서 나온 배열을 정렬하면 [2, 3, 5, 6]입니다.
2에서 나온 배열의 3번째 숫자는 5입니다.
배열 array, [i, j, k]를 원소로 가진 2차원 배열 commands가 매개변수로 주어질 때, commands의 모든 원소에 대해 앞서 설명한 연산을 적용했을 때 나온 결과를 배열에 담아 return 하도록 solution 함수를 작성해주세요.

**제한사항**
array의 길이는 1 이상 100 이하입니다.
array의 각 원소는 1 이상 100 이하입니다.
commands의 길이는 1 이상 50 이하입니다.
commands의 각 원소는 길이가 3입니다.
**입출력 예**
array	commands	return
[1, 5, 2, 6, 3, 7, 4]	[[2, 5, 3], [4, 4, 1], [1, 7, 3]]	[5, 6, 3]
**입출력 예 설명**
[1, 5, 2, 6, 3, 7, 4]를 2번째부터 5번째까지 자른 후 정렬합니다. [2, 3, 5, 6]의 세 번째 숫자는 5입니다.
[1, 5, 2, 6, 3, 7, 4]를 4번째부터 4번째까지 자른 후 정렬합니다. [6]의 첫 번째 숫자는 6입니다.
[1, 5, 2, 6, 3, 7, 4]를 1번째부터 7번째까지 자릅니다. [1, 2, 3, 4, 5, 6, 7]의 세 번째 숫자는 3입니다.

**pseudocode**
```textplain
input array, commands
l = commands.length

for k = 0 ~ l-1
    new_array = []

    start = commands[k][0]
    end   = commands[k][1]
    idx   = commands[k][2]

    for i = start-1 ~ end-1
        new_array.append(array[i])

    sort new_array

    answer[k] = new_array[idx-1]

output answerekfm
```
해당 풀이의 병목 : 매번 정렬 O(nlogn)
정렬할 필요 없이 선택 알고리즘 사용하여 K번째 값 찾기

```textplain
function quickselect(arr, left, right, k):
    if left == right:
        return arr[left]

    pivotIndex = random(left ~ right)
    swap(arr[pivotIndex], arr[right]) 
    p = partition(arr, left, right)

    if k == p:
        return arr[p]
    else if k < p:
        return quickselect(arr, left, p-1, k)
    else:
        return quickselect(arr, p+1, right, k)


function partition(arr, left, right):
    pivot = arr[right]
    store = left

    for i = left ~ right-1
        if arr[i] < pivot
            swap(arr[i], arr[store])
            store++

    swap(arr[store], arr[right])
    return store

new_array = slice(array, start-1, end)
target_index = idx-1
answer[k] = quickselect(new_array, 0, new_array.length-1, target_index)
```

```java
import java.util.*;

class Solution {

    public int[] solution(int[] array, int[][] commands) {
        int[] answer = new int[commands.length];
        Random rand = new Random();

        for (int k = 0; k < commands.length; k++) {

            int start = commands[k][0];
            int end   = commands[k][1];
            int idx   = commands[k][2];

            // 슬라이싱 (end는 exclusive)
            int[] sub = Arrays.copyOfRange(array, start - 1, end);

            // k번째 (0-index)
            answer[k] = quickselect(sub, 0, sub.length - 1, idx - 1, rand);
        }

        return answer;
    }

    private int quickselect(int[] arr, int left, int right, int k, Random rand) {

        while (left <= right) {

            int pivotIndex = left + rand.nextInt(right - left + 1);
            swap(arr, pivotIndex, right);

            int p = partition(arr, left, right);

            if (p == k) {
                return arr[p];
            } else if (k < p) {
                right = p - 1;
            } else {
                left = p + 1;
            }
        }

        return -1; // 이론상 도달 안 함
    }

    private int partition(int[] arr, int left, int right) {
        int pivot = arr[right];
        int store = left;

        for (int i = left; i < right; i++) {
            if (arr[i] < pivot) {
                swap(arr, i, store);
                store++;
            }
        }

        swap(arr, store, right);
        return store;
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```