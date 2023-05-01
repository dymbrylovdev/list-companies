import { ICompany } from "entities/company/types/company";
import { IEmployee } from "entities/employee/types/employee";

export const companies: ICompany[] = [
  {
    id: 1, name: 'Acme', address: '123 Main St.', idEmployees: [1, 2, 3],
  },
  {
    id: 2, name: 'Globex', address: '456 High St.', idEmployees: [4],
  },
  {
    id: 3, name: 'Initech', address: '789 Maple Ave.', idEmployees: [5, 6, 7],
  },
  {
    id: 4, name: 'Umbrella Corp', address: '555 Elm St.', idEmployees: [8, 9],
  },
  {
    id: 5, name: 'Stark Industries', address: '1 Stark Tower', idEmployees: [10, 11, 12],
  },
  {
    id: 6, name: 'Wayne Enterprises', address: '1007 Mountain Dr.', idEmployees: [13, 14],
  },
  {
    id: 7, name: 'Google', address: '1600 Amphitheatre Pkwy', idEmployees: [15],
  },
  {
    id: 8, name: 'Amazon', address: '410 Terry Ave. N', idEmployees: [16, 17, 18],
  },
  {
    id: 9, name: 'Tesla', address: '3500 Deer Creek Rd.', idEmployees: [19],
  },
  {
    id: 10, name: 'Microsoft', address: 'One Microsoft Way', idEmployees: [20],
  },
  {
    id: 11, name: 'Facebook', address: '1 Hacker Way', idEmployees: [],
  },
  {
    id: 12, name: 'Twitter', address: '1355 Market St.', idEmployees: [],
  },
  {
    id: 13, name: 'Uber', address: '1455 Market St.', idEmployees: [],
  },
  {
    id: 14, name: 'Airbnb', address: '888 Brannan St.', idEmployees: [],
  },
  {
    id: 15, name: 'Dropbox', address: '333 Brannan St.', idEmployees: [],
  },
  {
    id: 16, name: 'Slack', address: '500 Howard St.', idEmployees: [],
  },
  {
    id: 17, name: 'Salesforce', address: '415 Mission St.', idEmployees: [],
  },
  {
    id: 18, name: 'Oracle', address: '500 Oracle Pkwy', idEmployees: [],
  },
  {
    id: 19, name: 'Intel', address: '2200 Mission College Blvd.', idEmployees: [],
  },
  {
    id: 20, name: 'Cisco', address: '170 West Tasman Dr.', idEmployees: [],
  },
];

export const employees: IEmployee[] = [
  {
    id: 1, lastName: 'Иванов', firstName: 'Петр', position: 'Менеджер',
  },
  {
    id: 2, lastName: 'Петров', firstName: 'Иван', position: 'Директор',
  },
  {
    id: 3, lastName: 'Сидоров', firstName: 'Андрей', position: 'Разработчик',
  },
  {
    id: 4, lastName: 'Козлов', firstName: 'Дмитрий', position: 'Аналитик',
  },
  {
    id: 5, lastName: 'Кузнецов', firstName: 'Виктор', position: 'Дизайнер',
  },
  {
    id: 6, lastName: 'Ильин', firstName: 'Алексей', position: 'Тестировщик',
  },
  {
    id: 7, lastName: 'Семенов', firstName: 'Денис', position: 'Программист',
  },
  {
    id: 8, lastName: 'Михайлов', firstName: 'Игорь', position: 'Системный администратор',
  },
  {
    id: 9, lastName: 'Федоров', firstName: 'Михаил', position: 'Маркетолог',
  },
  {
    id: 10, lastName: 'Андреев', firstName: 'Сергей', position: 'Копирайтер',
  },
  {
    id: 11, lastName: 'Григорьев', firstName: 'Антон', position: 'PR-специалист',
  },
  {
    id: 12, lastName: 'Борисов', firstName: 'Евгений', position: 'Бухгалтер',
  },
  {
    id: 13, lastName: 'Лебедев', firstName: 'Кирилл', position: 'Эксперт',
  },
  {
    id: 14, lastName: 'Ершов', firstName: 'Николай', position: 'Стажер',
  },
  {
    id: 15, lastName: 'Александров', firstName: 'Владимир', position: 'HR-менеджер',
  },
  {
    id: 16, lastName: 'Фомин', firstName: 'Артем', position: 'Арт-директор',
  },
  {
    id: 17, lastName: 'Денисов', firstName: 'Александр', position: 'Креативный директор',
  },
  {
    id: 18, lastName: 'Степанов', firstName: 'Даниил', position: 'Мобильный разработчик',
  },
  {
    id: 19, lastName: 'Макаров', firstName: 'Егор', position: 'Frontend-разработчик',
  },
  {
    id: 20, lastName: 'Громов', firstName: 'Роман', position: 'Backend-разработчик',
  },
];
