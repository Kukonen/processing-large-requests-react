import './App.css';
import User from './components/User/user';
import UsersList from './components/UsersList/usersList';

function App() {
    return (
        <div id="App">
            <UsersList />
            <User />
        </div>
    );
}

export default App;
