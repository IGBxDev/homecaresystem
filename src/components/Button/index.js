import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { Button } from 'primereact/button';

export const ButtonSeverities = ({label, typeButton}) => {

    const severities = (typeButton) => {
        switch(typeButton) {
            case 'secondary':
                return 'p-button-secondary'
            case 'success':
              return 'p-button-success'
            case 'info':
                return 'p-button-info'
            case '-warning':
                return 'p-button-warning'
            case 'help':
                return 'p-button-help'
            case 'danger':
                return 'p-button-danger'
            default:
                return ''
          }
    }

    return(
    <Button 
        className={severities(typeButton)}
        label={label}

    />
    )
}
