package com.sample.qwords.repository;

import org.junit.Test;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.junit.Assert;
import org.junit.jupiter.api.io.TempDir;

// TODO: Upgrade from java v1.8 to 17
// Comprehensive tests for WordList class
public class WordListTest {
     /**
     * Basic, simple test of the WordList.getRandomWord() method to make
     * sure the random word is not null. Checks multiple times to account
     * for small lists.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testGetRandomWord() throws IOException {
        WordList wordList = new WordList();
        int iterations = 100;
        for (int i = 0; i < iterations; i++) {
            String randomWord = wordList.getRandomWord();
            Assert.assertNotNull("Random word should not be null", randomWord);
        }
    }

    /**
     * Test the WordList.getWordsByLength() method to ensure it returns
     * the correct list of words of the specified length.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testGetWordsByLength() throws IOException {
        WordList wordList = new WordList();
        List<String> words = wordList.getWordsByLength(5);
        for (String word : words) {
            Assert.assertEquals("Word length should be 5", 5, word.length());
        }
    }

    /**
     * Test the WordList.containsWord() method to ensure it returns true
     * when the word is present in the word list.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testContainsWord() throws IOException {
        WordList wordList = new WordList();
        Assert.assertTrue("Word list should contain 'animal'", wordList.containsWord("animal"));
    }

    /**
     * Test the WordList.removeWord() method to ensure it returns true
     * when the word is removed from the word list.
     *
     * @throws IOException if an I/O error occurs
     */
    @Test
    public void testRemoveWord() throws IOException {
        WordList wordList = new WordList();
        Assert.assertTrue("Word 'animal' should be removed from the word list", wordList.removeWord("animal"));
    }
  
}
