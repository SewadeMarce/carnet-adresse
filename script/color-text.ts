const colors = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
} as const; // "as const" rend les valeurs immuables et précises pour TS

// On définit les noms de couleurs disponibles pour les méthodes dynamiques
type ColorName = Exclude<keyof typeof colors, 'reset' | 'bold'>;

// On définit la signature d'une fonction de log
type LogFn = (colored: string, normal?: string) => void;

// On définit l'interface du logger
interface Logger {
    info: LogFn;
    success: LogFn;
    warn: LogFn;
    error: LogFn;
}

// On utilise un type d'intersection pour ajouter les méthodes dynamiques (red, green, etc.)
// Cela dit à TS : "Logger possède info/success ET toutes les clés de ColorName"
const logger = {} as Logger & Record<ColorName, LogFn>;

// 1. Définition des méthodes de base
logger.info = (colored, normal = "") => 
    console.log(`${colors.blue}${colored}${colors.reset}${normal}`);

logger.success = (colored, normal = "") => 
    console.log(`${colors.green}${colored}${colors.reset}${normal}`);

logger.warn = (colored, normal = "") => 
    console.log(`${colors.yellow}${colored}${colors.reset}${normal}`);

logger.error = (colored, normal = "") => 
    console.log(`${colors.red}${colors.bold}${colored}${colors.reset}${normal}`);

// 2. Génération dynamique des méthodes (red, cyan, etc.)
(Object.keys(colors) as Array<keyof typeof colors>).forEach(colorName => {
    if (['reset', 'bold'].includes(colorName)) return;

    const key = colorName as ColorName;
    logger[key] = (coloredText: string, normalText = "") => {
        console.log(`${colors[key]}${coloredText}${colors.reset}${normalText}`);
    };
});

export default logger;