// My css
// import './css/main.scss';

// boostrap
// import 'mdbootstrap/css/bootstrap.min.css';
// import 'mdbootstrap/css/mdb.min.css';
// import 'mdbootstrap/css/style.css';
//
// import 'mdbootstrap/js/jquery.min.js';
// import 'mdbootstrap/js/popper.min.js';
// import 'mdbootstrap/js/bootstrap.min.js';
// import 'mdbootstrap/js/mdb.min.js';

// My js
import MPage from './js/MPage/index.js';

let paginator = new MPage(10);

paginator.save(['andres','pedro','juan','andres','pedro','juan','andres','pedro','juan'], 'users');

console.log(paginator.get('users', 1));
