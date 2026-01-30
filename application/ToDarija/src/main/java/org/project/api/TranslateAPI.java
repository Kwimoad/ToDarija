package org.project.api;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import jakarta.ws.rs.core.Response;
import org.project.util.ClientApiKey;

import java.util.HashMap;
import java.util.Map;

/**
 * Handles translation of text to Moroccan Darija using Gemini.
 */
public class TranslateAPI {

    /**
     * Translate cleaned text to Moroccan Darija using Gemini.
     *
     * @param inputText text to translate
     * @return HTTP response with input and translation
     */
    public static Response translateToDarija(String inputText){
        try {
            Client client = ClientApiKey.getInstance().getClient();
            String prompt = "Translate the following text to Morrocan Darija, and return ONLY the corrected sentence in arabic language with no explanations : " + inputText;
            GenerateContentResponse response =
                    client.models.generateContent("gemini-2.5-flash", prompt, null);

            Map<String, String> jsonResponse = new HashMap<>();
            jsonResponse.put("input", inputText);
            jsonResponse.put("translation", response.text());

            return Response.ok(jsonResponse).build();

        }catch(Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", e.getMessage()))
                    .build();
        }

    }

}
