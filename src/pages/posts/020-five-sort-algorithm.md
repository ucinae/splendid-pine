---
title: 'Sorting algorithm'
subtitle: '정렬하는 5가지 방법'
date: 2019-06-08 15:30:00
author: 'hansol'
tags:
- algorithm
- sorting algorithm
- quick sort
- merge sort
- heap sort
- insertion sort
- selection sort
---

# 5가지 정렬 알고리즘

<br />

## 1. 삽입 정렬 (Insertion sort)

배열의 첫 요소부터 시작하여 자신의 위치를 찾아 **삽입**해나가며 정렬하는 방법

[정렬된 부분] [검사할 요소] [정렬 안 된 부분]

검사할 요소 하나를 잡고 왼쪽의 정렬된 부분의 오른쪽 요소부터 비교해 나가며 자신보다 작은 요소가 나올 때까지 계속 자리를 바꿔나가며 진행한다.

자신보다 왼쪽의 요소가 작거나 없으면 그 위치가 검사할 요소의 위치가 되며 자신의 자리를 찾게 된 것이다.

이러한 방법으로 마지막 요소까지 진행해 나가면 된다.

**시간 복잡도** :  $O(n^2)$

![insertion_sort](https://lh3.googleusercontent.com/ffiV0x7fz4PdFsTbgThhdOM9ngC9mY7kt8IfmJmIvZMPOR7LOWfpdBiSwRUXlq5hAL2kaf381oLrNRjqQHml4Gderojqd67RS0bJVjZdyqjmyzbdG3ko9FUsZq1lauEfhNbFbfnGRIUORjD_AgLaSC5JJjiRGc1pfWRbLH-P-_yBeeI63cIlt4ixA8zOm1NIRSA0D6awn4RwuoOQZZVWTmIk21M3MhELG3o9wW4Vi-bB_UcHUWwx6OQU5czVGd_z4IUZqZhHklQYNjSIO7oZlqdfOrZf4DANbF3KcHDlOTAVEsiuRjt4wmA2YK2R7Qc5JijEKDmxbWeqiPTHHsunro5bjtPxL-N2BchRw7MJCtVepqRSdKKgg6lyHkeXb6oqBqn2ZX9DbpRPrcH2SrNenATlPBF6tPbIF0_bjOsokjokZeeD5ZtWj0AWoD4jegjLwB8IkoIFKSWo6gQVmuN_-r07IsTltqztqspBbhW-MeTZahUgTIlb_vmrD9u0uejIBVYUjnu68zGiXJWMoTXekwZ6tCyazKZjH98lIFMxIEPLM0-qhCjgBlOXzPshQ0T0tOZBoqTMYFZtKYspilWsJU3jG3NJodMLVKY9eMZoDHupkmQ27BD_faJzGrecGF0Gi4Dm3NjDNyvWeAEoRgMmEF9JUvb7gno=w387-h506-no)

<br />

구현 코드

C++

```cpp
// 삽입 정렬
void insertionSort(vector<int>& v) {
	for (int i = 0; i < v.size(); i++) {
		for (int j = i; j > 0; j--) {
			if (v[j] < v[j - 1])
				swap(v[j], v[j - 1]);
      else
        break;
		}
	}
}

```



<br />

<br />

## 2. 선택 정렬 (Selection sort)

in-place sorting 알고리즘

전체 배열에서 첫번째로 작은 것 선택해 첫번째 자리어 넣고, 두번째로 작은 것 선택해 두번째 자리에 넣고 ... 이렇게 진행해 나가는 정렬

[정렬된 부분] [들어갈 자리] [정렬 안 된 부분]

[들어갈자리] ~ [정렬 안 된 부분]에서 가장 작은 요소를 찾아 [들어갈 자리]에 넣는다. 이를 마지막 요소까지 반복한다.

**시간 복잡도** : $O(n^2)$

![selection-sort](https://lh3.googleusercontent.com/Bmh4jldlkHtO_BTd09Vqje6EgMHU6CuKLAF26Lt8un7weW-4MU0XLsYmd_PDnDs8-KYSPEq47ZLsTClE0dSIKfyCDCciar0CD2wPl8I07ZYspKaDDw8m-cMAK8yhfCHWzeK7W_7SYMOeSAlLAP__bGLER7CJvCdgXavZKv-g8z3SwuX0vQ6cU_BSgqfu_Pwa2sV6vIQuBaNfzatxLInc0bpMl8Lajs4_U1CZSdJ5xN-WQHGoiwXlJmTVyHr95T1SSwUepod-_kGvT4_Soj_LcTacAqJMKD2iCDCOiA3aRYa_ePKFz0qyEuOJTsEKNIIf9_Ct1PwCioXBCqdXaExZVttxe5JsZ9GhALnn9Vb_mcm1Z3P1btNa8LNHa9QrKr4Wkqhnua4BGJRhh8S3YT2JH7JK8JfuyHjNTZtcW50k9XjjejuOeSUqSqeeBkl1lwk91DkI5NXINmcXhB78bq5JcobBBZVtze6FFiANaJOfKAnjJ-te0T9zho4lUvUQ_1fu98h2fzWOqXPMHlK5UlcfpxeWixQRhzjIWds-r9KH7wFco0LnSjd5htSIAuzmoZLdMcvTif2Mr1Q36jrgmD9qRqWYY1t3OPn5bolfnq7nuq8bn9OQxXmVJBYg-anYm6LhW8a9_1Hb6qKRCXhUpTbUBVfltH7bPs4=w387-h506-no)

<br />

구현 코드

C++

```cpp
// 선택 정렬
void selectionSort(vector<int>& v) {
	for (int i = 0; i < v.size(); i++) {
		int next = v[i];
		int next_index = i;
		for (int j = i + 1; j < v.size(); j++) {
			if (next > v[j]) {
				next = v[j];
				next_index = j;
			}
		}
		swap(v[i], v[next_index]);
	}
}
```

<br />

<br />



## 3. 합병 정렬 (Merge sort)

분할 정복 (divide and conquer) 방법을 사용

입력 배열을 0 조각이나 1조각이 날 때 까지 분할한다.

전부 분할이 되었으면 왼쪽 부분과 오른쪽 부분을 merge한다. (작은 것이 먼저 오게 넣어가며)

마지막까지 합쳐 나가면 정렬된 상태가 된다.

[입력 배열]

[왼쪽 절반] [오른쪽 절반]

[왼쪽, 오른쪽에서 작은 것 순서대로 들어와 완성]

**시간 복잡도** : $O(n\log_{2}n)$

![merge-sort](https://lh3.googleusercontent.com/sn45sr8Ys0bnF3rat9mOCiSY4pXroNoWfuiYdhKzupZA3haxi1yQ-e6U0VkCKRwrHX-2vSmIJmW-mw3an_uV9txr8-K1g-9htggKDxcLHO3-QV6viSLH66rYUFMM6KDW4DQ2bMLsXBSV1DxirvX0UnjOtOk3fiqN8hjrDjfCChPDa5uURT8usYJ0KhaDRCmvyEz566C5HvbgUT56lLslbP83uga0jmE9F0haePsqtRbO81f5mXeXXOR8aEWhCXpjmgn7gauG8D3jMoJ4z0DC_Kwqmb_BrzEZI9eEdftTjdJNdgV2VIlfSuRQ-R3fV6MvZRX0EHCj0Mu0CD-SB9UJ7p9j5kYrRS0eugEcZaZFEEwZNwuVwu2k_9aYQre6vku_Y0wX7uKj7nwbn89Mxp4Ms1opEX5mAbkaL6rNEG1n2K_Ma54mpeTucgO79hdQKCbwHji5kuBUrLf8MSDhgnyqx__lEzXzF-8R90Kh_X2fEPiuBxPPW5ySTn2rg_kkQSv6xxRWNaK8v7ToLLDYdouOdgeUxI1IMXbqhwI9DgUWFlauvUL7wYt_HW0GK_mG-wdFdWFrfoFPnNzjV_iRkFi36vlihYjojOq_eGHiVv122vJlIp80jjmff4pajlWXc75sMJ75MpJghJodGi0VdLlOOKgxQY7cR1c=w387-h506-no)

<br />

구현 코드

C++

```cpp
// 합병 정렬
void merge(vector<int>& v, int left, int mid, int right) {
	int a = left, b = mid + 1;
	vector<int> temp;
	temp.assign(v.begin(), v.end());

	for (int i = left; i <= right; i++) {
		if (a > mid)
			v[i] = temp[b++];
		else if (b > right)
			v[i] = temp[a++];
		else if (temp[a] < temp[b])
			v[i] = temp[a++];
		else if (temp[a] > temp[b])
			v[i] = temp[b++];
	}
}

void mergeSort(vector<int>& v, int left, int right) {
	if (left >= right) return;
	int mid = left + (right - left) / 2;
	mergeSort(v, left, mid);
	mergeSort(v, mid + 1, right);
	merge(v, left, mid, right);
}
```

<br />

<br />

## 4. 힙 정렬 (Heap sort)

입력 배열을 이용해 힙을 생성하고 힙에서 요소를 꺼내가며 배열을 다시 생성

**힙(Heap)**이란? 완전 이진 트리의 일종으로 여러 개의 값들 중에서 최댓값이나 최솟값을 빠르게 찾기위해 만들어진 자료구조.

[입력 배열]

(입력 배열의 요소 하나하나를 추가해 나가며 최소힙 생성)

[힙에서 요소 하나하나 빼내서 배열의 첫 부분부터 저장]

**시간 복잡도** : $O(n \log_{2}n)$

<br />

구현 코드

C++

```cpp
// 힙 정렬
void heapSort(vector<int>& v) {
	priority_queue<int> pq;
	for (auto n : v) {
		pq.push(-n);
	}
	for (int i = 0; i < v.size(); i++) {
		v[i] = -pq.top();
		pq.pop();
	}
}
```

<br />

<br />

## 5. 퀵 정렬 (Quick sort)

분할 정복 (divide and conquer) 방법을 사용

피벗 값을 하나 정해서 피벗보다 작은 값들은 왼쪽으로 큰 값은 오른쪽으로 몰아 넣어가며 정렬을 완성 시킨다.

[피벗] [정렬 안 된 배열]

[피벗 보다 작은 값들] [피벗] [피벗 보다 큰 값들]

이제 피벗 위치는 고정되었고 [피벗 보다 작은 값들]과 [피벗 보다 큰 값들]에서 똑같은 방법으로 [피벗]을 잡고 좌우로 나눈다.

**시간 복잡도** : 최악의 경우 $O(n\log_{2}n)$이지만 평균적으로 $O(n \log_{2}n)$의 시간 복잡도를 가진다.

<br />

![quick-sort](https://lh3.googleusercontent.com/t0nQe8aXAIVwNPRjvFTMp0Mj50B8l3_xsI_CblwmLbuUjghleZUItwJ-6bTS_v7xSaC48YTS_GOIO3tk9NNuXlny9v64sbUGRDHXEx9Mu6TfLU-nQ-SJyyNb6a21CnV9AWTPZtoC4v_bZ2RH4gREe4xoH2-FxQi7N-5g_0-ynAvIL70fQP1ZsWbS33OEb50baQcPfbGRw5cQQaavj1QscioC2WH0OBdS6y2OB2HQZ8KoJN51vb2-09p62oOT1s4WrSFFT3wmnEPhkJ706doitBXZRcnM-ooFISnB32ZENdkC3aVWJjBWkgut4bgVcay1Q9qLSRQmPqoZrx7dWr20Zs39X5lu36WkiDTVFif6VWXBsYlOARbxrWYOjYOwOICAG84adACQzfSiZjfyHziXmKAjydicvIQBNhu5et_JWY61Lfru_YnzotS7ouQYDaXpaNuPPTc2JplXZ9ax7zfBEVHuvvAU33mfO504Fy8WDE2_SP2cOhSKMun1DhGVkUtJFy_XaQadK5PVEIOYfR3VJqOUkpf1SZGnSxrmECAS_IgTcczcxpXU0kMr_fIrjJxyDvepQkxs0x2X82B_iaTTSHszEmb5QCPJC7ZafPoRhljBH1FNNvBY87yweniz86PxGgFQFimyUZGTtf5KOLMGP7zeR7g63MM=w387-h506-no)

<br />

구현 코드

C++

```cpp
// 퀵 정렬
int partition(vector<int>& v, int left, int right) {
	int a = left, b = right + 1;
	int pivot = v[left]; // 첫 원소를 pivot으로 잡는다.
	while (true) {
		while (v[++a] <= pivot)
			if (a == right)
				break;
		while (v[--b] >= pivot)
			if (b == left)
				break;
		if (a >= b)
			break;
		swap(v[a], v[b]);
	}
	swap(v[left], v[b]);
	return b;
}

void quickSort(vector<int>& v, int left, int right) {
	if (left >= right) return;
	int fixed = partition(v, left, right);
	quickSort(v, left, fixed - 1);
	quickSort(v, fixed + 1, right);
}
```

<br />