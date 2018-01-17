/**
 * Finds the longest common substring of given two string values
 * 
 * @param {String} firstWord 
 * @param {String} secondWord 
 * @returns {String} the longest common subsequence between the two strings
 */
const longestCommonSubstring = (firstWord, secondWord) => {
    let max = 0;
    let index = 0;

    const lcsMatrix = Array.from({ length: firstWord.length + 1 })
        .map(_ => {
            return Array.from({ length: secondWord.length + 1 })
                .map(_ => 0);
        });

    for (let i = 0; i <= firstWord.length; ++i) {
        for (let j = 0; j <= secondWord.length; ++j) {
            if (i === 0 || j === 0) {
                continue;
            }

            lcsMatrix[i][j] = firstWord[i - 1] === secondWord[j - 1] ?
                lcsMatrix[i - 1][j - 1] + 1 :
                0;

            if (max < lcsMatrix[i][j]) {
                max = lcsMatrix[i][j];
                index = i;
            }
        }
    }

    let lcs = '';
    for (let i = index - max; i < index; ++i) {
        lcs += firstWord[i];
    }

    return lcs;
}

module.exports = longestCommonSubstring;
