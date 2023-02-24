import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function PasswordInput({ label, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className='employee_input'>
            <span>
                {label}<span>*</span>:
            </span>
            <div className="password-input">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={value}
                    onChange={onChange}
                />
                <button type="button" onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
            </div>
        </div>
    );
}
export default PasswordInput;