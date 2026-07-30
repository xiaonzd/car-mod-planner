import Button from '../components/button';
import { BsPlusLg } from 'react-icons/bs';
import './header.css';

export default function Header({ onAddClick }) {
    return (
        <header>
            <div className="header-content">
                <h1>Car Mod Planner</h1>
                <p>Plan, budget, and track your build</p>
            </div>

            <Button icon={BsPlusLg} onClick={onAddClick}>
                Add Mod
            </Button>
        </header>
    );
}