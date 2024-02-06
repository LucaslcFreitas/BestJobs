import { useEffect } from 'react';
import './styles.sass';

function NotFound404() {
    useEffect(() => {
        document.title = 'Página não encontrada!';
    }, []);

    return (
        <div className="not-found">
            <h1>Página não encontrada!</h1>
        </div>
    );
}

export default NotFound404;
