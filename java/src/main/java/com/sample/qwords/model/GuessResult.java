package com.sample.qwords.model;

public class GuessResult {
    private String guess;
    private String feedback;

    public GuessResult(String guess, String feedback) {
        this.guess = guess;
        this.feedback = feedback;
    }

    public String getGuess() {
        return guess;
    }

    public String getFeedback() {
        return feedback;
    }
}