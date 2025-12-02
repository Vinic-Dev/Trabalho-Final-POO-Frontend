// Lista que define a ordem de exibição das categorias
// Categorias listadas aqui aparecerão primeiro, na ordem definida.
// Categorias não listadas aparecerão depois, em ordem alfabética.

export const ordemCategorias = [
    "Entradas",
    "Pratos Principais",
    "Bebidas",
    "Sobremesas",
    "Combos"
];

export const ordenarPorPrioridade = (categorias) => {
    return categorias.sort((a, b) => {
        const indexA = ordemCategorias.indexOf(a);
        const indexB = ordemCategorias.indexOf(b);

        // Se ambos estão na lista, ordena pela posição na lista
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        // Se apenas A está na lista, A vem primeiro
        if (indexA !== -1) return -1;

        // Se apenas B está na lista, B vem primeiro
        if (indexB !== -1) return 1;

        // Se nenhum está na lista, ordena alfabeticamente
        return a.localeCompare(b);
    });
};
