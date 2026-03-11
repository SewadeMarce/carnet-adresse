import os from 'node:os';

/**
 * Récupère l'adresse IP locale (IPv4) de la machine.
 * Retourne une string si trouvée, sinon undefined.
 */
const network = (): string | undefined => {
    const interfaces = os.networkInterfaces();
    
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        
        if (!networkInterface) continue;

        for (const alias of networkInterface) {
            // On cherche une adresse IPv4 qui n'est pas interne (pas 127.0.0.1)
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    
    return undefined;
};

export default network;