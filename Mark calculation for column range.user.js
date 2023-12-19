
/* Target pages look like:
* https://e-journal.iea.gov.ua/journal/index?journal=xxxxxx
* https://e-journal.iea.gov.ua/journal/index?journal=XXXXXX&page=X&per-page=15
* the script asks to enter 2 numbers: 1 - the ordinal number of the initial column, 
* and 2 - the ordinal number of the last column, in the range of which it will calculate 
* the arithmetic average for each student and download the list to a separate file.
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


function GetUserInputStart(){	
	let userInputStart;
    
    
		do {
			userInputStart = prompt('Порядковий номер першої колонки [ 1 - 199]', '');
		} while (
			userInputStart !== null &&
			(isNaN(userInputStart) ||
			!Number.isInteger(parseFloat(userInputStart)) ||
			parseInt(userInputStart) < 1 ||
			parseInt(userInputStart) > 199)
		);

		if (userInputStart !== null) {
			const integerValue = parseInt(userInputStart, 10);
			console.log(`Ви ввели ціле число в діапазоні від 1 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputStart;
}

function GetUserInputFinish(){	
	let userInputFinish;
		do {
			userInputFinish = prompt('Порядковий номер останньої колонки [ 2 - 200]', '');
		} while (
			userInputFinish !== null &&
			(isNaN(userInputFinish) ||
			!Number.isInteger(parseFloat(userInputFinish)) ||
			parseInt(userInputFinish) < 2 ||
			parseInt(userInputFinish) > 200)
		);

		if (userInputFinish !== null) {
			const integerValue = parseInt(userInputFinish, 10);
			console.log(`Ви ввели ціле число в діапазоні від 2 до 200: ${integerValue}`);
		} else {
			console.log('Ви відмінили введення або введено неправильне значення.');
		}
		return userInputFinish;
}



function calculateAverage(students) {
	
	let start = GetUserInputStart();	
	let finish = GetUserInputFinish();
	
    const results = students.map(student => {
        const grades = student.grades.slice(start - 1, finish); 
        const filteredGrades = grades.filter(grade => grade !== ''); 
        const sum = filteredGrades.reduce((acc, curr) => acc + parseFloat(curr), 0); 
        const count = filteredGrades.length; // Кількість оцінок

        const average = sum / count; 

        return `${student.name} - ${average.toFixed(2)}`; 
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

