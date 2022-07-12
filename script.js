
/* Функція повного заповнення обʼєкту */
function teamObjectCreation() {

    /* Початкові значення */
    var positionArr = [
        'Junior developer', 
        'Middle developer', 
        'Senior developer', 
        'Junior QA', 
        'Middle QA', 
        'Senior QA', 
        'Project manager'
        ];

    /* Створюємо масив імен */                   
    function getNames(){
        var namesArr = new Array(positionArr.length);
        for(var i = 0; i < positionArr.length; i++) {
            namesArr[i] = prompt('Введіть імʼя. Імен залишилось вводити: ' + (positionArr.length - i));
        }
        return namesArr;
    }

    /* Створюємо обʼєкт team */
    function teamObjectCreation(){  

        /* Отримуємо масив з попередньої функції */ 
        var namesArr = getNames();
        var team = new Object();
        for (var i = 0; i < namesArr.length; i++) {
            team['employee'+ (i+1)] = {
                name : namesArr[i],
                position : positionArr[i]
            };
        }
        return team;
    }

    /* Додаємо властивість salary */
    function salaryAdd() {

        /* Отримуємо обʼєкт з попередньої функції */ 
        var team = teamObjectCreation();

        /* Створюємо функцію для рандомних чисел в діапазоні */ 
        function randomInteger(min, max) {
                var rand = min + Math.random() * (max - min);
                return Math.round(rand);
            }

        /* Задаємо властивість salary у відповідності до посади*/     
        for (var i = 0; i < positionArr.length; i++) {
            if(team['employee'+(i+1)].position.indexOf('Junior') > -1){
                team['employee'+(i+1)].salary = randomInteger(500, 1000);
            } else if (team['employee'+(i+1)].position.indexOf('Middle')  > -1) {
                team['employee'+(i+1)].salary = randomInteger(1500, 2000);
            } else if (team['employee'+(i+1)].position.indexOf('Senior')  > -1) {
                team['employee'+(i+1)].salary = randomInteger(2500, 3000);
            } else {
                team['employee'+(i+1)].salary = randomInteger(4000, 4500);
            }
            }
            return team;
    }

    /* Додаємо метод tellAboutYourSelf */
    function addTellAboutYourSelf() {

        /* Отримуємо обʼєкт з попередньої функції */ 
        var team = salaryAdd();
        for (var i = 0; i < (positionArr.length); i++) {
            team['employee'+(i+1)].tellAboutYourSelf = function(){
            console.log('Мене звати ' + this.name + ' і я - ' + this.position + '. Я заробляю ' + this.salary + '$.');
        };
        }
        return team;
    }

    /* Додаємо метод addShowTeam */
    function addShowTeam() {

        /* Отримуємо обʼєкт з попередньої функції */ 
        var team = addTellAboutYourSelf();
        team.showTeam = function(){
            for (var i = 0; i < positionArr.length; i++) {
                console.log(team['employee'+(i+1)].name + ' - ' + team['employee'+(i+1)].position + '. Заробляю - ' + team['employee'+(i+1)].salary + '$.');
            }
        };
        return team;
    }
    
    /* Викликаємо останню функцію, що ланцюгом викличе усі попередні */ 
    var team = addShowTeam();

    /* Повертаємо фінальний обʼєкт */ 
    return team;
}



/* Функція використання методів */
function methodsUse() {

     /* Отримуємо фінальний обʼєкт з функції teamObjectCreation */ 
    var team = teamObjectCreation();
    console.log('Створений обʼєкт team:');

    /* Вивидимо фінальний обʼєкт */
    console.info(team);

    /* Створюємо функцію для вибору одного з двох методів */
    function methodSelection(){
        var selection = +prompt('1 - Показати інформацію про працівника. 2 - Показати інформацію про команду. Cancel/Скасувати - ВИХІД');
        if (selection == 1) {
            var employeeNumber = +prompt('Введіть номер працівника, про якого хочете дізнатись інформацію(1-' + (Object.keys(team).length-1)+ ')');
            if (employeeNumber > 0 && employeeNumber < Object.keys(team).length){
                team['employee'+employeeNumber].tellAboutYourSelf();
            } else {
                console.log('Введіть число віж 1 до ' + (Object.keys(team).length-1)); 
            }

        /* Додаємо рекурсію, щоб можна було викликати методи декілька разів */
        methodSelection();
        } else if(selection == 2) {
            team.showTeam();
            methodSelection();

        /* Спрацює вихід з рекурсії при клікі на "Cancel" */   
        } else  if(selection == 0) {
            console.info('Вихід з виводу методів');
        } else {
            /* Перевірка введених даних користувачем */ 
            console.log('Виберіть 1 або 2');
        }
    }

    /* Викликаємо функцію */ 
    methodSelection();
}

methodsUse();