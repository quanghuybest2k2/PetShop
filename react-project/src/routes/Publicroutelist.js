import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact';
import Register from '../components/frontend/auth/Register';
import Login from '../components/frontend/auth/Login';
import Album from '../components/frontend/Album';
import AddPet from '../components/frontend/Pet/AddPet';

const publicRoutesList = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/about', exact: true, name: 'About', component: About },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/album', exact: true, name: 'Album', component: Album },
    { path: '/addPet', exact: true, name: 'AddPet', component: AddPet },
    { path: '/register', exact: true, name: 'Register', component: Register },
];

export default publicRoutesList;