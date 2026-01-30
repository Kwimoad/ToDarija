package org.project.strategy;

import org.project.api.TextAPI;

/**
 * Preprocess plain text input before translation.
 */
public class TextProcessor implements InputProcessor{

    /**
     * Clean up text before translation.
     *
     * @param input text to process
     * @return cleaned text
     */
    @Override
    public String processor(Object input) {
        String inputText = String.valueOf(input);
        return TextAPI.getCleanText(inputText);
    }
}