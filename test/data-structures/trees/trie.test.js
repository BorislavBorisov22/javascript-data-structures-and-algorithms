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

        it('expect to insert correctly items and remain a valid trie structure', () => {
            trie.insertMany('word', 'woom', 'wor', 'newWord');

            expect(trie.size).to.equal(4);
            const root = trie.root;

            expect(root.value).to.equal('');
            expect(root.children.size).to.equal(2);
            expect(root.children.has('n')).to.be.true;
            expect(root.children.has('w')).to.be.true;

            let node = root.children.get('n');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('e')).to.be.true;

            node = node.children.get('e');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('w')).to.be.true;

            node = node.children.get('w');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('W')).to.be.true;

            node = node.children.get('W');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('o')).to.be.true;

            node = node.children.get('o');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('r')).to.be.true;

            node = node.children.get('r');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('d')).to.be.true;

            node = node.children.get('d');
            expect(node.isEndOfWord).to.be.true;
            expect(node.children.size).to.equal(0);

            node = root.children.get('w');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('o')).to.be.true;

            node = node.children.get('o');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(2);
            expect(node.children.has('o')).to.be.true;
            expect(node.children.has('r')).to.be.true;

            node = node.children.get('o');
            expect(node.isEndOfWord).to.be.false;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('m')).to.be.true;

            node = node.children.get('m');
            expect(node.isEndOfWord).to.be.true;
            expect(node.children.size).to.equal(0);

            node = root.children.get('w').children.get('o').children.get('r');
            expect(node.isEndOfWord).to.be.true;
            expect(node.children.size).to.equal(1);
            expect(node.children.has('d')).to.true;

            node = node.children.get('d');
            expect(node.isEndOfWord).to.be.true;
            expect(node.children.size).to.equal(0);
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

    describe('delete', () => {
        it('expect to removed words correctly when word is present in trie', () => {
            const words = [
                'someword',
                'someOtherWord',
                'newWord',
                'newnewWord',
                'newWorddd'
            ];

            trie.insertMany(...words);

            expect(trie.exists('someword')).to.be.true;

            trie.delete('someword');

            expect(trie.exists('someWord')).to.be.false;
            expect(trie.exists('someOtherWord')).to.be.true;

            expect(trie.exists('newWord')).to.be.true;
            trie.delete('newWord');
            expect(trie.exists('newWord')).to.be.false;
            expect(trie.exists('newWorddd')).to.be.true;
            expect(trie.exists('newnewWord')).to.be.true;

            trie.delete('someOtherWord');
            expect(trie.exists('someOtherWord')).to.be.false;

            // expect(trie._size).to.be.equal(2);
        });
    });

    describe('insert, delete', () => {});
});