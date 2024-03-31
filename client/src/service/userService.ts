export interface User {
    id: number;
    name: string;
    department: string;
    company: string;
    jobTitle: string;
}

export default class UserService {
    public static async getUsers() {

        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3030/users');
            xhr.send();

            xhr.onload = function() {
            if (xhr.status != 200) {
                reject(`Произошла ошибка ${xhr.status}: ${xhr.statusText}`)
            } else {
                resolve(JSON.parse(xhr.response));
            }
            };

            // отображение прогресса загрузки
            xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                console.log(`Получено ${event.loaded} из ${event.total} байт`);
            } else {
                console.log(`Получено ${event.loaded} байт`);
            }

            };

            xhr.onerror = function() {
                reject("Запрос не инициализирован")
            };
        });
    }
}