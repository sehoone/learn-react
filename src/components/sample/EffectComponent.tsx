import { useEffect, useState } from 'react';

const EffectComponent = () => {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://dummyapi.online/api/movies')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return <div>Data: {data}</div>;
};

export default EffectComponent;