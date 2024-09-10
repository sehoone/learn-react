import { useState } from 'react';

const ConditionalComponent = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                Toggle Visibility
            </button>
            {isVisible && <p>This is conditionally rendered</p>}
        </div>
    );
};

export default ConditionalComponent;