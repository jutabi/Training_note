let fs = require('fs');
let parse = require('csv-parse');

let f1to4 = fs.readFileSync('source/training_note.csv', 'utf8');

parse(f1to4, {comment:"#"}, function(csv_err, csv_data) {
	if (csv_err) {
		return console.log(csv_err);
	}

	// 세번째 줄부터 (2) 데이터 시작, 하루씩 날짜 증가
	for (let i = 2; i < csv_data.length; i++) {
		// csv_data[i] = 한 줄의 데이터
		// 1. 스탠다드 푸쉬업, 무릅 푸쉬업, 벤치프레스, 벤치 딥스,
		// 2. 풀업, 패러렐 풀업, 인버티드 로우, 원암 덤벨 로우, 컨센트레이션 컬
		// 3. 카프레이즈, 스쿼트, 행잉 레그레이즈, 레그레이즈
		// csv_data[i][1] = 첫날 스탠다드 풀업 갯수

		// 첫번째는 날짜 데이터, 두번째부터 운동별 횟수

		let splitDate = csv_data[i][0].split("-");
		let date = new Date(Number(splitDate[0]), Number(splitDate[1])-1, Number(splitDate[2]));

		let jsonTemp = {
			"@timestamp" : date };
		console.log(csv_data[i]);

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
		fs.appendFileSync("data/training_note.logs", logData);
		// fs.writeFileSync("../data/training_note.logs", logData);
	}
});