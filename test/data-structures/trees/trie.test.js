const Trie = require('../../../src/data-structures/trees/trie/trie');

const { expect } = require('chai');

describe('Trie', () => {
    let trie = new Trie();

    beforeEach(() => {
        trie = new Trie();
    });

    describe('insert', () => {
        it('expect to correctly insert words in trie', () => {
            const words = [
                'someword',
                'someOtherWord'
            ];

            trie.insertMany(...words);

            words.forEach((word) => {
                expect(trie.exists(word)).to.be.true;
            });

            expect(trie.size).to.equal(2);
        });
    });

    describe('exists', () => {
        it('expect to return false when search for non-existent word in trie', () => {
            const words = [
                'someword',
                'someOtherWord',
                'newWord',
                'newnewWord'
            ];

            trie.insertMany(...words);

            expect(trie.exists('somewor')).to.be.false;
            expect(trie.exists('non-existent-word')).to.be.false;
            expect(trie.exists('someOther')).to.be.false;
        });

        it('expect to return true when searched word is present in trie', () => {
            const words = [
                'someword',
                'someOtherWord',
                'newWord',
                'newnewWord'
            ];

            trie.insertMany(...words);

            expect(trie.exists('someOtherWord')).to.be.true;
            expect(trie.exists('newWord')).to.be.true;
        });
    });
});