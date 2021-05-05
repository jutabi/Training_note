let fs = require('fs');
// csv 파일을 javascript 객체로 불러오기 위한 라이브러리
let parse = require('csv-parse/lib/sync');

// try {
// 	let csvFile = fs.readFileSync('../source/training_note.csv', 'utf8');
// 	let csv_data = parse(csvFile);
// // console.log(csv_data);
// } catch (err) {
//
// }
// try {
// 	let txtFile = fs.readFileSync('../data/end_date.txt', 'utf8');
// 	let endDate_data = parse(txtFile);
// // console.log(endDate_data);
// } catch (err) {
//
// }

fs.readFile('../source/training_note.csv', 'utf8', function (err, csvFile) {
	if (err) {
		return console.log(err);
	}
	// 읽어온 csv 파일을 javascript object 로 변환
	let csv_data = parse(csvFile);
	// console.log(csv_data);

	// 신규데이터의 시작지점 index (3번째 줄(2)부터 csv 데이터의 시작점)
	let readDateStartIndex = 2;
	fs.readFile('../data/end_date.txt', 'utf8', function (err, txtFile) {
		if (err) {

		} else {
			let endDate_data = parse(txtFile);
			console.log(endDate_data);

			//txt 에서 마지막 날짜를 가져오고 그것으로 csv 에서 신규 데이터 시작부분 찾기
			for (let k = csv_data.length - 1; k >= 0; k--) {
				console.log("Value of k being searched: " + k);
				if (csv_data[k][0] === endDate_data[1][0]) {
					console.log("Last date discovered: " + csv_data[k][0]);

					// 현재 k 까지 데이터가 저장되어 있음으로 k + 1 부터의 새로운 데이터를 저장한다.
					readDateStartIndex = Number(k + 1);

					console.log("readDateStartIndex: " + readDateStartIndex);
					console.log("csv_data.length: " + csv_data.length);
					break;
				}
			}
		}
		// fs.writeFileSync("../data/training_note.logs", "");

		//세번째 줄부터 (2) 데이터 시작, 하루씩 날짜 증가
		for (let i = readDateStartIndex; i < csv_data.length; i++) {
			console.log(i);
			// csv_data[i] = 한 줄의 데이터
			// 1. 스탠다드 푸쉬업, 무릅 푸쉬업, 벤치프레스, 벤치 딥스,
			// 2. 풀업, 패러렐 풀업, 인버티드 로우, 원암 덤벨 로우, 컨센트레이션 컬
			// 3. 카프레이즈, 스쿼트, 행잉 레그레이즈, 레그레이즈
			// csv_data[i][1] = 첫날 스탠다드 풀업 갯수
			// 첫번째는 날짜 데이터, 두번째부터 운동별 횟수

			// '2021-05-01'을 2021과 05와 01로 쪼갠다.
			let splitDate = csv_data[i][0].split("-");
			let date = new Date(Number(splitDate[0]), Number(splitDate[1]) - 1, Number(splitDate[2]));

			// 운동을 하지 않은 날짜이더라도 데이터는 생성하도록 날짜만을 가지고있는 데이터 생성
			let jsonTemp = {
				"@timestamp" : date };
			// console.log(csv_data[i]);

			// 한 행에서 운동 전체를 탐색
			for (let exType = 1; exType < csv_data[i].length; exType++) {
				// 운동 데이터가 있다면 (빈칸이 아니라면)
				if (csv_data[i][exType] !== "") {
					// 엑셀 파일 내에 '20 20 20'의 형태로 반복횟수를 적기때문에 split
					let temp = csv_data[i][exType].split(" ");
					let sum = 0;
					for (let j = 0; j < temp.length; j++) {
						sum += Number(temp[j]);
					}
					let exerciseName = csv_data[1][exType];
					// 1. '20 20 20' 그대로 데이터 입력
					// jsonTemp[exerciseName] = csv_data[i][exType];

					// 2. 반복횟수를 모두 합하여 데이터 입력
					jsonTemp[exerciseName] = sum;
				}
			}

			// 개행문자를 마지막에 넣어 마지막줄은 빈줄로
			let logData = JSON.stringify(jsonTemp)+"\n";
			// 기존의 logs 파일에 새로운 운동 데이터를 추가한다.
			fs.appendFileSync("../data/training_note.logs", logData);

			if (i === csv_data.length - 1) {
				// 마지막 날짜만을 입력하고 나중에 불러와야 하기때문에 writeFileSync
				fs.writeFileSync('../data/end_date.txt', date);
				fs.appendFileSync('../data/end_date.txt', "\n" + csv_data[i][0]);
			}
		}
	});
});