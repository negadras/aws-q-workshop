package com.sample.qwords.model;

public class GuessHistory {
    private String guess;
    private String result;

    public GuessHistory(String guess, String result) {
        this.guess = guess;
        this.result = result;
    }

    public String getGuess() {
        return guess;
    }

    public String getResult() {
        return result;
    }
}