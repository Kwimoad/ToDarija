package org.project.api;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.project.util.ClientApiKey;

/**
 * Provides text cleaning and correction utilities using Gemini.
 */
public class TextAPI {

    /**
     * Clean and correct the input text using Gemini.
     *
     * @param inputText text to clean
     * @return cleaned and corrected text
     */
    public static String getCleanText(String inputText){
        try {
            Client client = ClientApiKey.getInstance().getClient();
            String prompt = "Correct ONLY this text and return ONLY the corrected sentence with no explanations: " + inputText;
            GenerateContentResponse response =
                    client.models.generateContent("gemini-2.5-flash", prompt, null);
            return response.text().trim();
        }catch(Exception e){
            throw e;
        }
    }

}
