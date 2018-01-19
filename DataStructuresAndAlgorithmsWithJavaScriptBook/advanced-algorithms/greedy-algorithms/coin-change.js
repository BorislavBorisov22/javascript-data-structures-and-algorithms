/**
 * Coin change greedy algorithm
 * 
 * @param {any} originalAmount 
 * @returns 
 */
const makeChange = (originalAmount) => {
    // saving each of the available coins count needed to make the change
    // indeces => 0 -> 0.1; 1 -> 0.05; 2 -> 0.1; 3 -> 0.25;
    const coins = Array.from({ length: 4 });

    let remainingAmount = 0;
    if (originalAmount % 0.25 < originalAmount) {
        coins[3] = parseInt(originalAmount / 0.25);
        remainingAmount = originalAmount % 0.25;
        originalAmount = remainingAmount;
    }

    if (originalAmount % 0.1 < originalAmount) {
        coins[2] = parseInt(originalAmount / 0.1);
        remainingAmount = originalAmount % 0.1;
        originalAmount = remainingAmount;
    }

    if (originalAmount % 0.05 < originalAmount) {
        coins[1] = parseInt(originalAmount / 0.05);
        remainingAmount = originalAmount % 0.05;
        originalAmount = remainingAmount;
    }

    coins[0] = parseInt(originalAmount / 0.01);

    return coins;
}
