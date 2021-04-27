let fs = require('fs');
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
		fs.writeFileSync("../data/training_note.logs", "");

		//세번째 줄부터 (2) 데이터 시작, 하루씩 날짜 증가
		for (let i = readDateStartIndex; i < csv_data.length; i++) {
			console.log(i);
			// csv_data[i] = 한 줄의 데이터
			// 1. 스탠다드 푸쉬업, 무릅 푸쉬업, 벤치프레스, 벤치 딥스,
			// 2. 풀업, 패러렐 풀업, 인버티드 로우, 원암 덤벨 로우, 컨센트레이션 컬
			// 3. 카프레이즈, 스쿼트, 행잉 레그레이즈, 레그레이즈
			// csv_data[i][1] = 첫날 스탠다드 풀업 갯수

			// 첫번째는 날짜 데이터, 두번째부터 운동별 횟수

			let splitDate = csv_data[i][0].split("-");
			let date = new Date(Number(splitDate[0]), Number(splitDate[1]) - 1, Number(splitDate[2]));

			let jsonTemp = {
				"@timestamp" : date };
			// console.log(csv_data[i]);

			for (let exType = 1; exType < csv_data[i].length; exType++) {
				if (csv_data[i][exType] !== "") {
					let temp = csv_data[i][exType].split(" ");
					let sum = 0;
					for (let j = 0; j < temp.length; j++) {
						sum += Number(temp[j]);
					}
					let exerciseName = csv_data[1][exType];
					// jsonTemp[exerciseName] = csv_data[i][exType];
					jsonTemp[exerciseName] = sum;
				}
			}

			let logData = JSON.stringify(jsonTemp)+"\n";
			fs.appendFileSync("../data/training_note.logs", logData);

			if (i === csv_data.length - 1) {
				fs.writeFileSync('../data/end_date.txt', date);
				fs.appendFileSync('../data/end_date.txt', "\n" + csv_data[i][0]);
			}
		}
	});
});