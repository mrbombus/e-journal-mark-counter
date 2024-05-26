/* Target pages look like:
* https://e-journal.iea.gov.ua/journal/index?journal=xxxxxx
* https://e-journal.iea.gov.ua/journal/index?journal=XXXXXX&page=X&per-page=15
* the script asks to enter 5 numbers - the ordinal numbers of the columns, 
* the arithmetic average will be calculated on those five columns for each student 
* and download the list to a separate file.
*/

function downloadTextFile(text, filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function GetUserInputFirst(){	
	let userInputFirst;
    let attempts = 10; 
    while (attempts > 0) {
		do {
			userInputFirst = prompt('Порядковий номер першої колонки [ 1 - 199]', '');
		} while (
			userInputFirst !== null &&
			(isNaN(userInputFirst) ||
			!Number.isInteger(parseFloat(userInputFirst)) ||
			parseInt(userInputFirst) < 1 ||
			parseInt(userInputFirst) > 199)
		);

		if (userInputFirst !== null) {
			const integerValue = parseInt(userInputFirst, 10);
			console.log(`Ви ввели ціле число в діапазоні від 1 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputFirst;
	}

    console.log('Ви вичерпали всі спроби введення. Програма перервана.');
    return null;
}



function GetUserInputSecond(){	
	let userInputSecond;
    let attempts = 10; 
    while (attempts > 0) {
		do {
			userInputSecond = prompt('Порядковий номер другої колонки [ 1 - 199]', '');
		} while (
			userInputSecond !== null &&
			(isNaN(userInputSecond) ||
			!Number.isInteger(parseFloat(userInputSecond)) ||
			parseInt(userInputSecond) < 1 ||
			parseInt(userInputSecond) > 199)
		);

		if (userInputSecond !== null) {
			const integerValue = parseInt(userInputSecond, 10);
			console.log(`Ви ввели ціле число в діапазоні від 1 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputSecond;
	}

    console.log('Ви вичерпали всі спроби введення. Програма перервана.');
    return null;
}

function GetUserInputThird(){	
	let userInputThird;
    let attempts = 10; 
    while (attempts > 0) {
		do {
			userInputThird = prompt('Порядковий номер третьої колонки [ 1 - 199]', '');
		} while (
			userInputThird !== null &&
			(isNaN(userInputThird) ||
			!Number.isInteger(parseFloat(userInputThird)) ||
			parseInt(userInputThird) < 1 ||
			parseInt(userInputThird) > 199)
		);

		if (userInputThird !== null) {
			const integerValue = parseInt(userInputThird, 10);
			console.log(`Ви ввели ціле число в діапазоні від 1 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputThird;
	}

    console.log('Ви вичерпали всі спроби введення. Програма перервана.');
    return null;
}

function GetUserInputFourth(){	
	let userInputFourth;
    let attempts = 10; 
    while (attempts > 0) {
		do {
			userInputFourth = prompt('Порядковий номер четвертої колонки [ 1 - 199]', '');
		} while (
			userInputFourth !== null &&
			(isNaN(userInputFourth) ||
			!Number.isInteger(parseFloat(userInputFourth)) ||
			parseInt(userInputFourth) < 1 ||
			parseInt(userInputFourth) > 199)
		);

		if (userInputFourth !== null) {
			const integerValue = parseInt(userInputFourth, 10);
			console.log(`Ви ввели ціле число в діапазоні від 1 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputFourth;
	}

    console.log('Ви вичерпали всі спроби введення. Програма перервана.');
    return null;
}




function GetUserInputFifth(){	
	let userInputFifth;
    let attempts = 10;
    while (attempts > 0) {
		do {
			userInputFifth = prompt('Порядковий номер п\'ятої колонки [ 2 - 200]', '');
		} while (
			userInputFifth !== null &&
			(isNaN(userInputFifth) ||
			!Number.isInteger(parseFloat(userInputFifth)) ||
			parseInt(userInputFifth) < 2 ||
			parseInt(userInputFifth) > 200)
		);

		if (userInputFifth !== null) {
			const integerValue = parseInt(userInputFifth, 10);
			console.log(`Ви ввели ціле число в діапазоні від 2 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputFifth;
	}

    console.log('Ви вичерпали всі спроби введення. Програма перервана.');
    return null;		
}

function calculateAverage(students) {
	let first = GetUserInputFirst();
	let second = GetUserInputSecond();
	let third = GetUserInputThird();
	let fourth = GetUserInputFourth();
	let fifth = GetUserInputFifth();
	
    const results = students.map(student => {
        const grades = [
            student.grades[first - 1], 
            student.grades[second - 1], 
            student.grades[third - 1], 
            student.grades[fourth - 1], 
            student.grades[fifth - 1] 
        ].filter(grade => grade !== '');

        const sum = grades.reduce((acc, curr) => acc + parseFloat(curr), 0);
        const count = grades.length;

	const precise = (sum / count);
        const average = Math.round(sum / count); 

        return `${average} -\t${student.name} -\t${precise.toFixed(2)}`; 
    });

    const data = results.join('\n');

    downloadTextFile(data, 'students.txt');
}


function GetQuantityPages(){
	const paginationLinks = document.querySelectorAll('ul.pagination li a');
	let pageNumber = null;

	paginationLinks.forEach(link => {
		const textContent = link.textContent.trim();
		const isNumber = !isNaN(textContent);

		if (isNumber) {
			pageNumber = parseInt(textContent);
		}
	});
	return pageNumber;
}

async function FormStudentsList(link, pages){
	const students = [];
	if (!link.includes('&page=')){
		link = link + '&page=1&per-page=15';
	}
	console.log(link);
	for(let i=1; i<=pages; i++){
		link =link.replace(/page=\d+/, 'page=' + i);
		
		const response = await fetch(link, {
		method: 'GET',
		headers: {
		'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
	  },
		credentials: 'include' 
	  });
	  
	  const fetchAnswer = await response.text();
	  
	  const sourseCode = document.createElement('div');
	  sourseCode.innerHTML = fetchAnswer;
	  
	  const trElements = sourseCode.querySelectorAll('tr');
	  
	  
		trElements.forEach(tr => {
			const inputs = tr.querySelectorAll('td.pt-point input[type="text"]');
			if (inputs.length === 0) {
				return;
			};

			const studentId = tr.querySelector('td[data-student-id]')?.getAttribute('data-student-id');
			const studentName = tr.querySelector('td[data-student-id] a')?.textContent.trim();
			const grades = [];

			inputs.forEach(input => {
				const value = input.value.trim();
				grades.push(value);
			});

			const existingStudent = students.find(student => student.id === studentId && student.name === studentName);

			if (existingStudent) {
				existingStudent.grades = existingStudent.grades.concat(grades);
			} else {
				const student = {
					id: studentId,
					name: studentName,
					grades: grades
				};
				students.push(student);
			};
		});
	};
	return students;
};


/*  APPLICATION  */


let journalLink = window.location.href;

let quantityPages = GetQuantityPages();

const students = await FormStudentsList(journalLink, quantityPages);

calculateAverage(students);
