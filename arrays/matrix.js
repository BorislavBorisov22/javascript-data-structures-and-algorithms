Array.matrix = (rows, columns, initialValue) => {
    const matrix = Array.from({ length: rows })
        .map(row => {
            return Array
                .from({ length: columns })
                .map(_ => initialValue);
        });

    return matrix;
};

const matrix = Array.matrix(5, 5, -1);
console.log(matrix, 'matrix');